import * as CommandType from "../../modules/client/enums/command.js";
import VersionCommand from "./default.js";

export const Structure = {
	["type"]: CommandType.CHAT_INPUT,
	["name"]: "version",
	["description"]: "Displays the version the bot is currently running on",
	["default_permission"]: true,
	["options"]: []
};

export const Invoke = VersionCommand;
