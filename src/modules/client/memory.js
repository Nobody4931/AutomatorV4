// NOTE: IDs are snowflakes (strings) because idk discords on drugs or something

// TODO: might add bans later
// 			* if so, disable ban/kick commands from other bots
// 			* and also create custom ban/kick commands

import * as Options from "../../config.js";

export const Client   = {};
export const Guild    = {};
export const Roles    = {};
export const Channels = {};
export const Members  = {};
export const Users    = {};
//export const Bans     = {};
export const Emojis   = {};

var ClientCallback   = null;
var GuildCallback    = null;
var RoleCallbacks    = [];
var ChannelCallbacks = [];
var MemberCallbacks  = [];
var UserCallbacks    = [];
//var BanCallbacks     = [];
var EmojiCallbacks   = [];
var EmojisCallback   = null;
var EmojisLoaded     = false;


/* Save Functions */
export async function SaveClient(Data) {
	// https://discord.com/developers/docs/resources/user#user-object
	Client.ID = Data.id;
	Client.Username = Data.username;
	Client.Discriminator = Data.discriminator;
	Client.Tag = `${Data.username}#${Data.discriminator}`;
	Client.Avatar = Data.avatar;

	if (ClientCallback != null)
		ClientCallback();
}

export async function SaveGuild(Data) {
	// https://discord.com/developers/docs/resources/guild#guild-object
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

	if (GuildCallback != null)
		GuildCallback();
}

export async function SaveRole(Data) {
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

	for (const I in RoleCallbacks) {
		if (RoleCallbacks[I][0](Roles[Data.id]) == true) {
			RoleCallbacks[I][1](Roles[Data.id]);
			RoleCallbacks.splice(I, 1);
		}
	}

	return Roles[Data.id];
}

export async function SaveChannel(Data) {
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

	for (const I in ChannelCallbacks) {
		if (ChannelCallbacks[I][0](Channels[Data.id]) == true) {
			ChannelCallbacks[I][1](Channels[Data.id]);
			ChannelCallbacks.splice(I, 1);
		}
	}

	return Channels[Data.id];
}

export async function SaveMember(Data) {
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

	for (const I in MemberCallbacks) {
		if (MemberCallbacks[I][0](Members[Data.user.id]) == true) {
			MemberCallbacks[I][1](Members[Data.user.id]);
			MemberCallbacks.splice(I, 1);
		}
	}

	return Members[Data.user.id];
}

export async function SaveUser(Data) {
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

	for (const I in UserCallbacks) {
		if (UserCallbacks[I][0](Users[Data.id]) == true) {
			UserCallbacks[I][1](Users[Data.id]);
			UserCallbacks.splice(I, 1);
		}
	}

	return Users[Data.id];
}

export async function SaveEmoji(Data) {
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

		for (const I in EmojiCallbacks) {
			if (EmojiCallbacks[I][0](Emojis[Emoji.name]) == true) {
				EmojiCallbacks[I][1](Emojis[Emoji.name]);
				EmojiCallbacks.splice(I, 1);
			}
		}
	}

	EmojisLoaded = true;
	if (EmojisCallback != null)
		EmojisCallback();
}

/* Collection Functions */
function GenerateTimeoutCollector(Group, GroupCallbacks) {
	return async function(Filter, Timeout = null) {
		return new Promise((Resolve) => {
			for (const Item of Object.values(Group))
				if (Filter(Item) == true)
					return Resolve(Item);

			let Callback = [ Filter, Resolve ];
			Timeout != null && setTimeout(() => {
				let Index = GroupCallbacks.findIndex((CB) => (CB == Callback));
				if (Index != -1)
					GroupCallbacks.splice(Index, 1);
				Resolve(null);
			}, Timeout);

			GroupCallbacks.push(Callback);
		});
	}
}

export async function CollectClient() {
	return new Promise((Resolve) => {
		if (Client.ID != null)
			return Resolve();
		ClientCallback = Resolve;
	});
}

export async function CollectGuild() {
	return new Promise((Resolve) => {
		if (Guild.ID != null)
			return Resolve();
		GuildCallback = Resolve;
	});
}

export async function CollectEmojis() {
	return new Promise((Resolve) => {
		if (EmojisLoaded == true)
			return Resolve();
		EmojisCallback = Resolve;
	});
}

export const CollectRole = GenerateTimeoutCollector(Roles, RoleCallbacks);
export const CollectChannel = GenerateTimeoutCollector(Channels, ChannelCallbacks);
export const CollectMember = GenerateTimeoutCollector(Members, MemberCallbacks);
export const CollectUser = GenerateTimeoutCollector(Users, UserCallbacks);
export const CollectEmoji = GenerateTimeoutCollector(Emojis, EmojiCallbacks);
