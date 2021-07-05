// https://discord.com/developers/docs/resources/user
import * as DAPI from "../../api/api.js";
import * as HttpOP from "../../api/enums/http.js";

export async function LeaveGuild(GuildID, Data, Headers) {
	let Response = await DAPI.DELETERequestA(`users/@me/guilds/${GuildID}`, Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}

export async function CreateDM(Data, Headers) {
	let Response = await DAPI.POSTRequestA("users/@me/channels", Data, Headers);
	if (HttpOP.IsValidStatus(Response.status) == false) throw `HTTP_ERROR: ${Response.statusText}`;
	return Response;
}
