// https://discord.com/developers/docs/topics/gateway
import * as DAPI from "./api.js";
import * as Memory from "../client/memory.js";
import * as Dispatcher from "../client/dispatcher.js";
import * as Options from "../../config.js";

import * as GatewayOP from "./enums/gateway.js";
import * as HttpOP from "./enums/http.js";
import * as Intents from "./enums/intents.js";
import * as ActivityType from "../client/enums/activity.js";

import * as DClient from "../client/wrappers/client.js";

import {
	Message as MessageCollector,
	Reaction as ReactionCollector,
	Interaction as InteractionCollector
} from "../client/collectors.js";

import WebSocket from "ws";


/** @type {WebSocket} **/   // screw you lsp
export var Socket = null;

export var Endpoint = null;
export var EndpointUpdate = 0;

export var LastSession = null;
export var LastSequence = null;

export var PingTimer = null;


/* Send Ping (1) */
export function SendPing() {
	Socket.send(`{"op":${GatewayOP.HEARTBEAT},"d":${LastSequence}}`);
}

/* Send Identify (2) */
export function SendIdentify() {
	console.log("starting new session");
	Socket.send(JSON.stringify({
		"op": GatewayOP.IDENTIFY,
		"d": {
			"token": Options.AppToken,
			"properties": {
				"$os": process.platform,
				"$browser": "4931",
				"$device": "4931"
			},
			"large_threshold": 250,
			"presence": {
				"since": null,
				"activities": [{
					"type": ActivityType.WATCHING,
					"name": "over dis_cord:tm:"
				}],
				"status": "online",
				"afk": false
			},
			"intents": Intents.ALL
		}
	}));
}

/* Send Resume (6) */
export function SendResume() {
	console.log("resuming session");
	Socket.send(JSON.stringify({
		"op": GatewayOP.RESUME,
		"d": {
			"token": Options.AppToken,
			"session_id": LastSession,
			"seq": LastSequence
		}
	}));
}

/* (Re)Connect to Gateway */
export async function Connect() {
	// Update endpoint every 15 minutes
	const CurrTime = new Date().getTime();
	if (CurrTime - EndpointUpdate > 900000) {
		const GatewayData = await DAPI.GETRequestA("gateway/bot");
		if (GatewayData.status == HttpOP.FORBIDDEN) throw "INVALID_TOKEN";
		if (GatewayData.status != HttpOP.OK) throw `HTTP_ERROR: ${GatewayData.statusText}`;
		if (GatewayData.data.session_start_limit.remaining == 0) throw "RATE_LIMITED";

		Endpoint = GatewayData.data.url;
		EndpointUpdate = CurrTime;
	}

	Socket = new WebSocket(`${Endpoint}?v=${Options.WSVersion}&encoding=json`);
	Socket.onclose = HandleDisconnect;
	Socket.onerror = console.warn; // pretty sure this would never happen but just in case

	Socket.onmessage = function(Event) {
		const Data = JSON.parse(Event.data);
		switch (Data.op) {

			case GatewayOP.DISPATCH:
				LastSequence = Data.s;
				return Dispatcher.Dispatch(Data.t, Data);

			case GatewayOP.HEARTBEAT:
				return SendPing();

			case GatewayOP.INVALID_SESSION:
				if (LastSession != null) {
					if (Data.d == true)
						return SendResume();
					LastSession = null;
					LastSequence = null;
					return setTimeout(SendIdentify, 2500);
				} else throw "INVALID_SESSION";

			case GatewayOP.HELLO:
				LastSession == null
					? SendIdentify()
					: SendResume();
				PingTimer = setInterval(SendPing, Data.d.heartbeat_interval);
				return;

		}
	}
}

/* Gateway Disconnections */
export async function HandleDisconnect(Event) {
	if (Socket && Socket.readyState != WebSocket.CLOSED)
		Socket.close();
	if (PingTimer != null)
		clearInterval(PingTimer),
		PingTimer = null;

	// obviously there are other errors i would handle
	// but not going to lie they would probably never
	// occur soooooooooooooo
	switch (Event.code) {
		case GatewayOP.RATE_LIMITED:
			throw "RATE_LIMITED";

		default:
			setTimeout(Connect, 1500);
			break;
	}
}


/*** INITIALIZATION ***/

/* Ready Event */
Dispatcher.AddHandler("READY", async (Data) => {
	LastSession = Data.d.session_id;

	Memory.SaveClient(Data.d.user);

	// Check guilds
	let FoundGuild = false;
	let FoundEmoji = false;

	for (const GuildP of Data.d.guilds) {
		if (GuildP.id == Options.GuildID)
			FoundGuild = true;
		else if (GuildP.id == Options.EmojiID)
			FoundEmoji = true;
		else DClient.LeaveGuild(GuildP.id);
	}

	if (FoundGuild == false)
		throw "NOT_IN_GUILD";
	if (FoundEmoji == false)
		throw "NOT_IN_EMOJI";

	// Request guild members
	// SEE: https://discord.com/developers/docs/topics/gateway#request-guild-members
	Socket.send(JSON.stringify({
		"op": GatewayOP.REQUEST_MEMBERS,
		"d": {
			"guild_id": Options.GuildID,
			"query": "",
			"limit": 0,
			"presences": false
		}
	}));
});


/* Guild + Emoji Events */
Dispatcher.AddHandler(["GUILD_CREATE", "GUILD_UPDATE"], async (Data) => {
	if (Data.d.id == Options.GuildID)
		return Memory.SaveGuild(Data.d);
	if (Data.d.id == Options.EmojiID)
		return Memory.SaveEmoji(Data.d);
	DClient.LeaveGuild(Data.d.id);
});

Dispatcher.AddHandler("GUILD_DELETE", async (Data) => {
	if (Data.d.unavailable == false) {
		if (Data.d.id == Options.GuildID)
			throw "REMOVED_FROM_GUILD";
		if (Data.d.id == Options.EmojiID)
			throw "REMOVED_FROM_EMOJI";
	} else if (Data.d.id == Options.GuildID)
		Memory.Guild.Unavailable = true;
});

Dispatcher.AddHandler("GUILD_EMOJIS_UPDATE", async (Data) => {
	if (Data.d.guild_id == Options.EmojiID) {
		Memory.SaveEmoji(Data.d);
	}
});


/* Role Events */
Dispatcher.AddHandler(["GUILD_ROLE_CREATE", "GUILD_ROLE_UPDATE"], async (Data) => {
	if (Data.d.guild_id == Options.GuildID) {
		Memory.SaveRole(Data.d.role);
	}
});

Dispatcher.AddHandler("GUILD_ROLE_DELETE", async (Data) => {
	if (Data.d.guild_id == Options.GuildID) {
		delete Memory.Roles[Data.d.role_id];
	}
});


/* Channel Events */
Dispatcher.AddHandler(["CHANNEL_CREATE", "CHANNEL_UPDATE"], async (Data) => {
	if (Data.d.guild_id == Options.GuildID) {
		Memory.SaveChannel(Data.d);
	}
});

Dispatcher.AddHandler("CHANNEL_DELETE", async (Data) => {
	if (Data.d.guild_id == Options.GuildID) {
		delete Memory.Channels[Data.d.id];
	}
});


/* Member Events */
Dispatcher.AddHandler(["GUILD_MEMBER_ADD", "GUILD_MEMBER_UPDATE"], async (Data) => {
	if (Data.d.guild_id == Options.GuildID) {
		Memory.SaveMember(Data.d);
	}
});

Dispatcher.AddHandler("GUILD_MEMBERS_CHUNK", async (Data) => {
	if (Data.d.guild_id == Options.GuildID) {
		for (const MemberP of Data.d.members) {
			Memory.SaveMember(MemberP);
		}
	}
});

Dispatcher.AddHandler("GUILD_MEMBER_REMOVE", async (Data) => {
	if (Data.d.guild_id == Options.GuildID) {
		delete Memory.Members[Data.user.id];
		delete Memory.Users[Data.user.id];
	}
});

/* User Events */
Dispatcher.AddHandler("USER_UPDATE", async (Data) => {
	if (Memory.Users[Data.d.id] != null) {
		Memory.SaveUser(Data.d);
	}
});


/* Collection Events */
function HandleCollector(Event, Collector) {
	Dispatcher.AddHandler(Event, async (Data) => {

		// Live collectors
		for (const Index in Collector.ActiveLive) {
			const Task = Collector.ActiveLive[Index];

			if (Task.Started == true && Task.Filter(Data.d) == true) {
				if (Task.CallbackCol != null)
					Task.CallbackCol(Data.d);
				if (Task.Limit != null && --Task.Limit <= 0)
					Task.Stop(Index);
			}
		}

		// Bulk collectors
		for (const Index in Collector.ActiveBulk) {
			const Task = Collector.ActiveBulk[Index];

			if (Task.Filter(Data.d) == true) {
				Task.Collected.push(Data.d);
				if (Task.Limit != null && --Task.Limit <= 0)
					Task.Stop(Index);
			}
		}

	});
}

HandleCollector("MESSAGE_CREATE", MessageCollector);
HandleCollector("MESSAGE_REACTION_ADD", ReactionCollector);
HandleCollector("INTERACTION_CREATE", InteractionCollector);
