// https://discord.com/developers/docs/resources/guild
import * as DAPI from "../../api/api.js";
import * as HttpOP from "../../api/enums/http.js";
import * as Options from "../../../config.js";

export async function ModifyGuild(Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`guilds/${Options.GuildID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function CreateChannel(Data, Headers) {
	let Response = await DAPI.POSTRequestA(`guilds/${Options.GuildID}/channels`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function MoveChannel(Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`guilds/${Options.GuildID}/channels`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function ModifyMember(UserID, Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`guilds/${Options.GuildID}/members/${UserID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function ModifyNick(Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`guilds/${Options.GuildID}/members/@me/nick`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function AddRole(UserID, RoleID, Data, Headers) {
	let Response = await DAPI.PUTRequestA(`guilds/${Options.GuildID}/members/${UserID}/roles/${RoleID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function RemoveRole(UserID, RoleID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`guilds/${Options.GuildID}/members/${UserID}/roles/${RoleID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function RemoveMember(UserID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`guilds/${Options.GuildID}/members/${UserID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function CreateBan(UserID, Data, Headers) {
	let Response = await DAPI.PUTRequestA(`guilds/${Options.GuildID}/bans/${UserID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function RemoveBan(UserID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`guilds/${Options.GuildID}/bans/${UserID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function CreateRole(Data, Headers) {
	let Response = await DAPI.POSTRequestA(`guilds/${Options.GuildID}/roles`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function MoveRole(Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`guilds/${Options.GuildID}/roles`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function ModifyRole(RoleID, Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`guilds/${Options.GuildID}/roles/${RoleID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function DeleteRole(RoleID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`guilds/${Options.GuildID}/roles/${RoleID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}
