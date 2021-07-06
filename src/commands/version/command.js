import VersionCommand from "./default.js";

export const Structure = {
	["name"]: "version",
	["description"]: "Displays the version the bot is currently running on",
	["default_permission"]: true,
	["options"]: []
};

export const Invoke = VersionCommand;
