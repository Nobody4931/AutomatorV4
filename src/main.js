import Fs from "fs";

import * as Options from "./config.js";
import * as Socket from "./modules/api/socket.js";
import * as Memory from "./modules/client/memory.js";
import * as Dispatcher from "./modules/client/dispatcher.js";

import * as TicketData from "./datastore/targets/tickets.js";
import * as SchoolData from "./datastore/targets/schools.js";
import * as YearData from "./datastore/targets/years.js";
import * as ModifierData from "./datastore/targets/modifiers.js";
import * as ColorData from "./datastore/targets/colors.js";
import * as UserData from "./datastore/targets/users.js";

import * as InteractionType from "./modules/client/enums/interaction.js";

import * as DCommands from "./modules/client/wrappers/commands.js";

export const Commands = {};


/* Bot Initialization */
Dispatcher.AddHandler("READY", async () => {
	await Memory.CollectClient();
	await Memory.CollectGuild();
	await Memory.CollectEmojis();

	let Owner = Memory.Users[Options.OwnerID];
	let Emojis = Object.keys(Memory.Emojis);
	let Routines = null;

	console.log(`Successfully authenticated as: ${Memory.Client.Tag} (${Memory.Client.ID})\n`);
	console.log(`Found guild: ${Memory.Guild.Name} (${Memory.Guild.ID})`);
	console.log(`Found owner: ${Owner.Tag} (${Owner.ID})`);
	console.log(`Found ${Emojis.length} emoji(s): ${Emojis.join(", ")}\n`);

	// Load datastores
	Routines = [];
	for (const Datastore of [ TicketData, SchoolData, YearData, ModifierData, ColorData ])
		Routines.push(Datastore.Get());
	await Promise.all(Routines);
	console.log(`Loaded ${Routines.length} datastore(s)`);

	Routines = [];
	for (const UserID in Memory.Users)
		if (Memory.Users[UserID].Bot == false)
			Routines.push(UserData.Get(UserID));
	await Promise.all(Routines);
	console.log(`Loaded user data for ${Routines.length} user(s)\n`);

	// Unregister old commands
	Routines = [];
	let CommandData = await DCommands.GetGuilds();
	for (const Command of CommandData.data)
		Routines.push(DCommands.DeleteGuild(Command.id));
	await Promise.all(Routines);
	console.log(`Unregistered ${Routines.length} old command(s)`);

	// Register new commands
	Routines = [];
	for (const CmdDir of Fs.readdirSync("src/commands")) {
		let CommandMeta = await import(`./commands/${CmdDir}/command.js`);
		Routines.push(DCommands.CreateGuild(CommandMeta.Structure).then((CommandData) => {
			Commands[CommandData.data.id] = CommandMeta.Invoke;
			console.log(`Registered command '${CommandMeta.Structure.name}'`);
		}));
	}

	await Promise.all(Routines);
	console.log(`Registered ${Routines.length} command(s)`);
});

/* Command Handler */
Dispatcher.AddHandler("INTERACTION_CREATE", async (Data) => {
	if (Data.d.type != InteractionType.APPLICATION_COMMAND) return;
	if (Data.d.application_id == Options.AppID && Commands[Data.d.data.id] != null) {
		Commands[Data.d.data.id](Data.d);
	}
});

/* Login Routine */
console.log(`Loading ${Options.Name} ${Options.Version}...`);
Socket.Connect();
