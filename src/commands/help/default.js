import * as Options from "../../config.js";
import * as Utility from "../../modules/functions/util.js";

import * as InteractionType from "../../modules/client/enums/interaction.js";
import * as DInteractions from "../../modules/client/wrappers/interactions.js";


export default async function(Interaction) {
	let Embed = Utility.GenerateEmbed();
	Embed.color = Utility.Colors.PGreen;
	Embed.title = `${Options.Name} Help`;
	Embed.description = `${Options.Name} is a private server management bot written by ${Utility.UserString(Options.OwnerID)}, used to organize roles and information about users of this server`;
	Embed.fields = [];

	Embed.fields[0] = {};
	Embed.fields[0].name = "Getting Started";
	Embed.fields[0].value = "If you just joined the server, you can use the `/verify` command to open a verification ticket to gain access to the rest of the server";
	Embed.fields[0].inline = false;

	Embed.fields[1] = {};
	Embed.fields[1].name = "Querying Information";
	Embed.fields[1].value = `If you want to see information about a single user, you can use the \`/userinfo get\` command
If you want to see information about all users, you can use the \`/userinfo all\` command`;
	Embed.fields[1].inline = false;

	let Response = {};
	Response.type = InteractionType.CB_CHANNEL_MESSAGE_WITH_SOURCE;
	Response.data = {};
	Response.data.embeds = [ Embed ];

	await DInteractions.CreateResponse(Interaction.id, Interaction.token, Response);
}
