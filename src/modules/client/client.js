// https://discord.com/developers/docs/resources/user
import * as DAPI from "../api/api.js";
import * as HttpOP from "../api/enums/http.js";

export async function LeaveGuild(GuildID) {
	let Response = await DAPI.DELETERequestA(`users/@me/guilds/${GuildID}`);
	if (Response.status != HttpOP.NO_CONTENT) throw `GET_ERROR: ${Response.statusText}`;
	return Response;
}

export async function CreateDM(RecipientID) {
	let Response = await DAPI.POSTRequestA("users/@me/channels", {
		recipient_id: RecipientID });
	if (Response.status != HttpOP.OK) throw `GET_ERROR: ${Response.statusText}`;
	return Response;
}
