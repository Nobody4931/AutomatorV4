// https://discord.com/developers/docs/interactions/application-commands
import * as DAPI from "../../api/api.js";
import * as HttpOP from "../../api/enums/http.js";
import * as Options from "../../../config.js";

export async function GetGlobals(Data, Headers) {
	let Response = await DAPI.GETRequestA(`applications/${Options.AppID}/commands`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function GetGlobal(CommandID, Data, Headers) {
	let Response = await DAPI.GETRequestA(`applications/${Options.AppID}/commands/${CommandID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function CreateGlobal(Data, Headers) {
	let Response = await DAPI.POSTRequestA(`applications/${Options.AppID}/commands`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function EditGlobal(CommandID, Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`applications/${Options.AppID}/commands/${CommandID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function DeleteGlobal(CommandID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`applications/${Options.AppID}/commands/${CommandID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function GetGuilds(Data, Headers) {
	let Response = await DAPI.GETRequestA(`applications/${Options.AppID}/guilds/${Options.GuildID}/commands`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function GetGuild(CommandID, Data, Headers) {
	let Response = await DAPI.GETRequestA(`applications/${Options.AppID}/guilds/${Options.GuildID}/commands/${CommandID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function CreateGuild(Data, Headers) {
	let Response = await DAPI.POSTRequestA(`applications/${Options.AppID}/guilds/${Options.GuildID}/commands`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function EditGuild(CommandID, Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`applications/${Options.AppID}/guilds/${Options.GuildID}/commands/${CommandID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function DeleteGuild(CommandID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`applications/${Options.AppID}/guilds/${Options.GuildID}/commands/${CommandID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function GetPermissionsAll(Data, Headers) {
	let Response = await DAPI.GETRequestA(`applications/${Options.AppID}/guilds/${Options.GuildID}/commands/permissions`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function GetPermissions(CommandID, Data, Headers) {
	let Response = await DAPI.GETRequestA(`applications/${Options.AppID}/guilds/${Options.GuildID}/commands/${CommandID}/permissions`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function EditPermissions(CommandID, Data, Headers) {
	let Response = await DAPI.PUTRequestA(`applications/${Options.AppID}/guilds/${Options.GuildID}/commands/${CommandID}/permissions`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function EditPermissionsAll(Data, Headers) {
	let Response = await DAPI.PUTRequestA(`applications/${Options.AppID}/guilds/${Options.GuildID}/commands/permissions`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

// TODO: Maybe bulk editing?
// SEE: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
// SEE: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-guild-application-commands
