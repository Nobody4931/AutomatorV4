// NOTE: IDs are snowflakes (strings) because idk discords on drugs or something

// TODO: Might add ban caching later
// 			* Meaning: Disable all ban/kick commands on other bots
// 			* and create custom ones for Automator

import * as Options from "../../config.js";

export const Client   = {};
export const Guild    = {};
export const Roles    = {};
export const Channels = {};
export const Members  = {};
export const Users    = {};
export const Emojis   = {};

var ClientCB     = []; // probably a much better way of doing this
var GuildCB      = []; // but screw it
var EmojisCB     = [];
var ClientLoaded = false;
var GuildLoaded  = false;
var EmojisLoaded = false;


/* Save Functions */
export function SaveClient(Data) {
	// https://discord.com/developers/docs/resources/user#user-object
	ClientLoaded = false;

	Client.ID = Data.id;
	Client.Username = Data.username;
	Client.Discriminator = Data.discriminator;
	Client.Tag = `${Data.username}#${Data.discriminator}`;
	Client.Avatar = Data.avatar;

	ClientLoaded = true;
	for (const Callback of ClientCB)
		Callback();
	ClientCB = [];
}

export function SaveGuild(Data) {
	// https://discord.com/developers/docs/resources/guild#guild-object
	GuildLoaded = false;

	Guild.ID = Data.id;
	Guild.Name = Data.name;
	Guild.Owner = Data.owner_id;
	Guild.Unavailable = Data.unavailable ?? false;

	if (Data.joined_at != null)
		Guild.CreatedAt = new Date(Data.joined_at);

	for (const Role of Data.roles)
		SaveRole(Role);

	if (Data.channels != null) for (const Channel of Data.channels)
		SaveChannel(Channel);

	if (Data.members != null) for (const Member of Data.members)
		SaveMember(Member);

	GuildLoaded = true;
	for (const Callback of GuildCB)
		Callback();
	GuildCB = [];
}

export function SaveRole(Data) {
	// https://discord.com/developers/docs/topics/permissions#role-object
	Roles[Data.id] = {};
	Roles[Data.id].ID = Data.id;
	Roles[Data.id].Name = Data.name;
	Roles[Data.id].Color = Data.color;
	Roles[Data.id].Position = Data.position;
	Roles[Data.id].Hoist = Data.hoist;
	Roles[Data.id].Mentionable = Data.mentionable;
	Roles[Data.id].Managed = Data.managed;
	Roles[Data.id].BoostRole = Data.tags?.premium_subscriber ?? false;
	Roles[Data.id].Permissions = parseInt(Data.permissions);

	return Roles[Data.id];
}

export function SaveChannel(Data) {
	// https://discord.com/developers/docs/resources/channel#channel-object
	Channels[Data.id] = {};
	Channels[Data.id].ID = Data.id;
	Channels[Data.id].Type = Data.type;
	Channels[Data.id].Name = Data.name;
	Channels[Data.id].Topic = Data.topic;
	Channels[Data.id].Position = Data.position;
	Channels[Data.id].Parent = Data.parent_id;

	Channels[Data.id].Permissions = Data.permission_overwrites?.map((OData) => {
		let Overwrite = {};
		Overwrite.ID = OData.id;
		Overwrite.Type = OData.type;
		Overwrite.Allow = parseInt(OData.allow);
		Overwrite.Deny = parseInt(OData.deny);
		return Overwrite;
	});

	return Channels[Data.id];
}

export function SaveMember(Data) {
	// https://discord.com/developers/docs/resources/guild#guild-member-object
	if (Data.user == null) return;
	if (Data.user.id == Options.AppID) return SaveClient(Data.user);

	Members[Data.user.id] = {};
	Members[Data.user.id].ID = Data.user.id;
	Members[Data.user.id].Nickname = Data.nick;
	Members[Data.user.id].Roles = Data.roles;
	Members[Data.user.id].JoinedAt = new Date(Data.joined_at);
	Members[Data.user.id].BoostAt = Data.premium_since ? new Date(Data.premium_since) : null;
	Members[Data.user.id].Muted = Data.mute ?? false;
	Members[Data.user.id].Deafened = Data.deaf ?? false;

	SaveUser(Data.user);

	return Members[Data.user.id];
}

export function SaveUser(Data) {
	// https://discord.com/developers/docs/resources/user#user-object
	if (Data.id == Options.AppID) return SaveClient(Data);

	Users[Data.id] = {};
	Users[Data.id].ID = Data.id;
	Users[Data.id].Username = Data.username;
	Users[Data.id].Discriminator = Data.discriminator;
	Users[Data.id].Tag = `${Data.username}#${Data.discriminator}`;
	Users[Data.id].Avatar = Data.avatar;
	Users[Data.id].Bot = Data.bot ?? false;
	Users[Data.id].System = Data.system ?? false;

	return Users[Data.id];
}

export function SaveEmoji(Data) {
	// https://discord.com/developers/docs/resources/emoji#emoji-object
	EmojisLoaded = false;

	for (const Emoji in Emojis)
		delete Emojis[Emoji];
	for (const Emoji of Data.emojis) {
		if (Emojis[Emoji.name] != null)
			throw "CONFLICTING_EMOJIS";

		Emojis[Emoji.name] = {};
		Emojis[Emoji.name].ID = Emoji.id;
		Emojis[Emoji.name].Name = Emoji.name;
		Emojis[Emoji.name].Colons = Emoji.require_colons ?? false;
		Emojis[Emoji.name].Animated = Emoji.animated ?? false;
		Emojis[Emoji.name].Available = Emoji.available ?? false;
	}

	EmojisLoaded = true;
	for (const Callback of EmojisCB)
		Callback();
	EmojisCB = [];
}

/* Collection Functions */
export async function CollectClient() {
	return new Promise((Resolve) => {
		if (ClientLoaded == true)
			return Resolve();
		ClientCB.push(Resolve);
	});
}

export async function CollectGuild() {
	return new Promise((Resolve) => {
		if (GuildLoaded == true)
			return Resolve();
		GuildCB.push(Resolve);
	});
}

export async function CollectEmojis() {
	return new Promise((Resolve) => {
		if (EmojisLoaded == true)
			return Resolve();
		EmojisCB.push(Resolve);
	});
}

/* Searching Functions */
function GenFindFunction(Group) {
	return function(Filter) {
		for (const ID in Group) {
			if (Filter(Group[ID]) == true) {
				return Group[ID];
			}
		}
	}
}

export const FindRole    = GenFindFunction(Roles);
export const FindChannel = GenFindFunction(Channels);
export const FindMember  = GenFindFunction(Members);
export const FindUser    = GenFindFunction(Users);
export const FindEmoji   = GenFindFunction(Emojis);
