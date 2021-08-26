import * as CommandType from "../../modules/client/enums/command.js";
import HelpCmd from "./default.js";

export const Structure = {
	["type"]: CommandType.CHAT_INPUT,
	["name"]: "help",
	["description"]: "Displays information about the bot",
	["default_permission"]: true,
	["options"]: []
};

export const Invoke = HelpCmd;
