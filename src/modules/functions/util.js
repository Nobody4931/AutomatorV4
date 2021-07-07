import * as Options from "../../config.js";

import * as Snowflake from "../api/snowflake.js";
import * as Memory from "../client/memory.js";

import * as DImages from "../client/wrappers/images.js";

import Fs from "fs";


export const Colors = {
	["Red"]:     0xff0000,
	["PRed"]:    0xe03c26,
	["Orange"]:  0xff7700,
	["POrange"]: 0xf29830,
	["Yellow"]:  0xffff00,
	["PYellow"]: 0xf9ff54,
	["Green"]:   0x00ff00,
	["PGreen"]:  0x5ff55f,
	["Aqua"]:    0x4dffa0,
	["LBlue"]:   0x00ffee,
	["SBlue"]:   0x74ede5,
	["WBlue"]:   0x46b2e8,
	["Blue"]:    0x0000ff,
	["Purple"]:  0x7700ff,
	["PPurple"]: 0x9a6cff,
	["Pink"]:    0xff00ff,
	["PPink"]:   0xff8fff,
	["Magenta"]: 0xff0077
};


export async function Sleep(Milliseconds) {
	return new Promise((Resolve) => setTimeout(Resolve, Milliseconds));
}

export function BufferFromFile(Path, Options) {
	let FileText = Fs.readFileSync(Path, Options);
	let FileData = Buffer.alloc(FileText.length);

	for (let I = 0; I < FileText.length; ++I)
		FileData.writeUInt8(FileText.charCodeAt(I), I);

	return FileData;
}

export function ReadString16(Buffer, Offset = 0) {
	let Result = "";

	while (true) {
		let CharCode = Buffer.readUInt16LE(Offset); Offset += 2;
		if (CharCode == 0) break;
		Result += String.fromCharCode(CharCode);
	}

	return [ Result, Offset ];
}

export function WriteString16(Buffer, Data, Offset = 0) {
	for (let I = 0; I < Data.length; ++I)
		Offset = Buffer.writeUInt16LE(Data.charCodeAt(I), Offset);
	Offset = Buffer.writeUInt16LE(0, Offset);
	return Offset;
}

// https://discord.com/developers/docs/reference#message-formatting
export const UserString = (UserID) => `<@!${UserID}>`;
export const ChannelString = (ChannelID) => `<#${ChannelID}>`;
export const RoleString = (RoleID) => `<@&${RoleID}>`;
export const EmojiString = (Emoji) => `<${Emoji.Animated ? "a" : ""}:${Emoji.Name}:${Emoji.ID}>`;
export const TimeString = (Time, Style = "F") => `<t:${Time.getTime() - Snowflake.Epoch}:${Style}>`;

export function GenerateEmbed(User = null) {
	const Embed = {};
	Embed.type = "rich"; // NOTE: might be deprecated soon
	Embed.timestamp = new Date().toISOString();

	Embed.footer = {};
	Embed.footer.text = `${Options.Name} ${Options.Version}`;
	Embed.footer.icon_url = DImages.GetAvatarURL(Memory.Client.ID, Memory.Client.Avatar);

	if (User != null) {
		Embed.author = {};
		Embed.author.name = User.Tag;
		Embed.author.icon_url = DImages.GetAvatarURL(User.ID, User.Avatar);
	}

	return Embed;
}
