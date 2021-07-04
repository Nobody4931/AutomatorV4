// NOTE: IDs are strings because idk discords on drugs or something

// TODO: might add bans later

import * as DAPI from "../api/api.js";
import * as HttpOP from "../api/enums/http.js";

export const Client   = {};
export const Guild    = {};
export const Roles    = {};
export const Channels = {};
export const Members  = {};
export const Users    = {};
//export const Bans     = {};
export const Emojis   = {};


export async function SaveClient(Data) {
	// https://discord.com/developers/docs/resources/user#user-object
	Client.ID = Data.id;
	Client.Username = Data.username;
	Client.Discriminator = Data.discriminator;
	Client.Tag = `${Data.username}#${Data.discriminator}`;
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
	Roles[Data.id].BoostRole = Data.tags?.premium_subscriber;
	Roles[Data.id].Permissions = parseInt(Data.permissions);
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
}

export async function SaveMember(Data) {
	// https://discord.com/developers/docs/resources/guild#guild-member-object
	if (Data.user == null) return;

	Members[Data.user.id] = {};
	Members[Data.user.id].ID = Data.user.id;
	Members[Data.user.id].Nickname = Data.nick;
	Members[Data.user.id].Roles = Data.roles;
	Members[Data.user.id].JoinedAt = new Date(Data.joined_at);
	Members[Data.user.id].BoostAt = Data.premium_since ? new Date(Data.premium_since) : null;
	Members[Data.user.id].Muted = Data.mute ?? false;
	Members[Data.user.id].Deafened = Data.deaf ?? false;

	SaveUser(Data.user);
}

export async function SaveUser(Data) {
	// https://discord.com/developers/docs/resources/user#user-object
	Users[Data.id] = {};
	Users[Data.id].ID = Data.id;
	Users[Data.id].Username = Data.username;
	Users[Data.id].Discriminator = Data.discriminator;
	Users[Data.id].Tag = `${Data.username}#${Data.discriminator}`;
	Users[Data.id].Bot = Data.bot ?? false;
	Users[Data.id].System = Data.system ?? false;
}

export async function SaveEmoji(Data) {
	// https://discord.com/developers/docs/resources/emoji#emoji-object
	for (const Emoji in Emojis)
		delete Emojis[Emoji];
	for (const Emoji of Data.emojis) {
		Emojis[Emoji.name] = {};
		Emojis[Emoji.name].ID = Emoji.id;
		Emojis[Emoji.name].Name = Emoji.name;
		Emojis[Emoji.name].Colons = Emoji.require_colons ?? false;
		Emojis[Emoji.name].Available = Emoji.available ?? false;
	}
}
