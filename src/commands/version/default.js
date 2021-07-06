import * as Options from "../../config.js";
import * as Utility from "../../modules/functions/util.js";

import * as InteractionType from "../../modules/client/enums/interaction.js";
import * as DInteractions from "../../modules/client/wrappers/interactions.js";


export default async function(Interaction) {
	let Embed = {};
	Embed.color = Utility.Colors.PGreen;
	Embed.description = `${Options.Name} is currently running on version **${Options.Version}**`;

	let Response = {};
	Response.type = InteractionType.CB_CHANNEL_MESSAGE_WITH_SOURCE;
	Response.data = {};
	Response.data.embeds = [ Embed ];

	await DInteractions.CreateResponse(Interaction.id, Interaction.token, Response);
}
