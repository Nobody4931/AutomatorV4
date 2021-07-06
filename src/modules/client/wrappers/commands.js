// https://discord.com/developers/docs/interactions/slash-commands
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

// TODO: Add support for command permissions to keep admin-only commands away from nerds
// 		* https://discord.com/developers/docs/interactions/slash-commands#get-guild-application-command-permissions
