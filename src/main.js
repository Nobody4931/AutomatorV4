// TODO: Now make the actual userdata / ticketdata / etc. as a wrapper for my datastore library
// TODO: Fix Memory Collectors - Multiple callbacks for collection will break it
// TODO: Load Userdata for all users on READY - Meaning add a Memory Collector that fires when all users have been cached
import Fs from "fs";

import * as Options from "./config.js";
import * as Socket from "./modules/api/socket.js";
import * as Memory from "./modules/client/memory.js";
import * as Dispatcher from "./modules/client/dispatcher.js";

import * as Userdata from "./datastore/targets/users.js";

import * as InteractionType from "./modules/client/enums/interaction.js";

import * as DCommands from "./modules/client/wrappers/commands.js";

export const Commands = {};


/* Bot Initialization */
Dispatcher.AddHandler("READY", async () => {
	await Memory.CollectClient();
	await Memory.CollectGuild();
	await Memory.CollectEmojis();

	let Owner = await Memory.CollectUser((User) => (User.ID == Options.OwnerID));
	let Emojis = Object.keys(Memory.Emojis);

	console.log(`Successfully authenticated as: ${Memory.Client.Tag} (${Memory.Client.ID})\n`);
	console.log(`Found guild: ${Memory.Guild.Name} (${Memory.Guild.ID})`);
	console.log(`Found owner: ${Owner.Tag} (${Owner.ID})`);
	console.log(`Found ${Emojis.length} emoji(s): ${Emojis.join(", ")}\n`);

	// Unregister old commands
	let CommandData = await DCommands.GetGuilds();
	let Unregisters = [];
	for (const Command of CommandData.data)
		Unregisters.push(DCommands.DeleteGuild(Command.id));
	await Promise.all(Unregisters);
	console.log(`Unregistered ${Unregisters.length} old command(s)`);

	// Register new commands
	let Registers = [];
	for (const CmdDir of Fs.readdirSync("src/commands")) {
		let CommandMeta = await import(`./commands/${CmdDir}/command.js`);
		Registers.push(DCommands.CreateGuild(CommandMeta.Structure).then((CommandData) => {
			Commands[CommandData.data.id] = CommandMeta.Invoke;
			console.log(`Registered command '${CommandMeta.Structure.name}'`);
		}));
	}

	await Promise.all(Registers);
	console.log(`Registered ${Registers.length} command(s)`);
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
