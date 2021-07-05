// https://discord.com/developers/docs/resources/guild
import * as Memory from "./memory.js";
import * as DAPI from "../api/api.js";
import * as HttpOP from "../api/enums/http.js";

export async function ModifyGuild(Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`guilds/${Memory.Guild.ID}`, Data, Headers);
	if (Response.status != HttpOP.OK) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function CreateChannel(Data, Headers) {
	let Response = await DAPI.POSTRequestA(`guilds/${Memory.Guild.ID}/channels`, Data, Headers);
	if (Response.status != HttpOP.OK) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function MoveChannel(Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`guilds/${Memory.Guild.ID}/channels`, Data, Headers);
	if (Response.status != HttpOP.NO_CONTENT) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function ModifyMember(UserID, Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`guilds/${Memory.Guild.ID}/members/${UserID}`, Data, Headers);
	if (Response.status != HttpOP.OK &&
		Response.status != HttpOP.BAD_REQUEST) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function ModifyNick(Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`guilds/${Memory.Guild.ID}/members/@me/nick`, Data, Headers);
	if (Response.status != HttpOP.OK) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function AddRole(UserID, RoleID, Data, Headers) {
	let Response = await DAPI.PUTRequestA(`guilds/${Memory.Guild.ID}/members/${UserID}/roles/${RoleID}`, Data, Headers);
	if (Response.status != HttpOP.NO_CONTENT) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function RemoveRole(UserID, RoleID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`guilds/${Memory.Guild.ID}/members/${UserID}/roles/${RoleID}`, Data, Headers);
	if (Response.status != HttpOP.NO_CONTENT) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function RemoveMember(UserID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`guilds/${Memory.Guild.ID}/members/${UserID}`, Data, Headers);
	if (Response.status != HttpOP.NO_CONTENT) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function CreateBan(UserID, Data, Headers) {
	let Response = await DAPI.PUTRequestA(`guilds/${Memory.Guild.ID}/bans/${UserID}`, Data, Headers);
	if (Response.status != HttpOP.NO_CONTENT) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function RemoveBan(UserID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`guilds/${Memory.Guild.ID}/bans/${UserID}`, Data, Headers);
	if (Response.status != HttpOP.NO_CONTENT) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function CreateRole(Data, Headers) {
	let Response = await DAPI.POSTRequestA(`guilds/${Memory.Guild.ID}/roles`, Data, Headers);
	if (Response.status != HttpOP.OK) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function MoveRole(Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`guilds/${Memory.Guild.ID}/roles`, Data, Headers);
	if (Response.status != HttpOP.OK) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function ModifyRole(RoleID, Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`guilds/${Memory.Guild.ID}/roles/${RoleID}`, Data, Headers);
	if (Response.status != HttpOP.OK) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function DeleteRole(RoleID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`guilds/${Memory.Guild.ID}/roles/${RoleID}`, Data, Headers);
	if (Response.status != HttpOP.NO_CONTENT) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}
