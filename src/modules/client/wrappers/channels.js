// https://discord.com/developers/docs/resources/channel
import * as DAPI from "../../api/api.js";
import * as HttpOP from "../../api/enums/http.js";

export async function ModifyChannel(ChannelID, Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`channels/${ChannelID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function DeleteChannel(ChannelID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`channels/${ChannelID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function GetMessages(ChannelID, Data, Headers) {
	let Response = await DAPI.GETRequestA(`channels/${ChannelID}/messages?${Data}`, null, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function GetMessage(ChannelID, MessageID, Data, Headers) {
	let Response = await DAPI.GETRequestA(`channels/${ChannelID}/messages/${MessageID}?${Data}`, null, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

// SEE: https://discord.com/developers/docs/reference#message-formatting
export async function CreateMessage(ChannelID, Data, Headers) {
	let Response = await DAPI.POSTRequestA(`channels/${ChannelID}/messages`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function CreateReaction(ChannelID, MessageID, EmojiEncoded, Data, Headers) {
	let Response = await DAPI.PUTRequestA(`channels/${ChannelID}/messages/${MessageID}/reactions/${EmojiEncoded}/@me`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function DeleteReaction(ChannelID, MessageID, EmojiEncoded, UserID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`channels/${ChannelID}/messages/${MessageID}/reactions/${EmojiEncoded}/${UserID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function GetReactions(ChannelID, MessageID, EmojiEncoded, Data, Headers) {
	let Response = await DAPI.GETRequestA(`channels/${ChannelID}/messages/${MessageID}/reactions/${EmojiEncoded}?${Data}`, null, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function ClearReactions(ChannelID, MessageID, EmojiEncoded, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`channels/${ChannelID}/messages/${MessageID}/reactions${EmojiEncoded != null ? `/${EmojiEncoded}` : ``}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function EditMessage(ChannelID, MessageID, Data, Headers) {
	let Response = await DAPI.PATCHRequestA(`channels/${ChannelID}/messages/${MessageID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function DeleteMessage(ChannelID, MessageID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`channels/${ChannelID}/messages/${MessageID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function DeleteMessages(ChannelID, Data, Headers) {
	let Response = await DAPI.POSTRequestA(`channels/${ChannelID}/messages/bulk-delete`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function ModifyOverwrite(ChannelID, OverwriteID, Data, Headers) {
	let Response = await DAPI.PUTRequestA(`channels/${ChannelID}/permissions/${OverwriteID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function DeleteOverwrite(ChannelID, OverwriteID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`channels/${ChannelID}/permissions/${OverwriteID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function StartTyping(ChannelID, Data, Headers) {
	let Response = await DAPI.POSTRequestA(`channels/${ChannelID}/typing`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}
