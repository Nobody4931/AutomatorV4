// https://discord.com/developers/docs/interactions/slash-commands
import * as DAPI from "../api/api.js";
import * as HttpOP from "../api/enums/http.js";
import * as Options from "../../config.js";

export async function CreateResponse(InterID, InterToken, Data, Headers) {
	let Response = await DAPI.POSTRequestA(`interactions/${InterID}/${InterToken}/callback`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function GetResponse(InterToken, Data, Headers) {
	let Response = await DAPI.GETRequestA(`webhooks/${Options.AppID}/${InterToken}/messages/@original`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function EditResponse(InterToken, Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`webhooks/${Options.AppID}/${InterToken}/messages/@original`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function DeleteResponse(InterToken, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`webhooks/${Options.AppID}/${InterToken}/messages/@original`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function CreateFollowup(InterToken, Data, Headers) {
	let Response = await DAPI.POSTRequestA(`webhooks/${Options.AppID}/${InterToken}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function EditFollowup(InterToken, MessageID, Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`webhooks/${Options.AppID}/${InterToken}/messages/${MessageID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function DeleteFollowup(InterToken, MessageID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`webhooks/${Options.AppID}/${InterToken}/messages/${MessageID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}
