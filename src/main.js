import * as Options from "./config.js";
import * as Socket from "./modules/api/socket.js";
import * as Memory from "./modules/client/memory.js";
import * as Dispatcher from "./modules/client/dispatcher.js";

let StartTime;
let EndTime;

Dispatcher.AddHandler("READY", async () => {
	await Memory.CollectClient();
	await Memory.CollectGuild();
	await Memory.CollectEmojis();

	let Owner = await Memory.CollectUser((User) => (User.ID == Options.OwnerID));

	EndTime = performance.now();

	console.log(`Successfully authenticated as: ${Memory.Client.Tag} (${Memory.Client.ID})\n`);
	console.log(`Found guild: ${Memory.Guild.Name} (${Memory.Guild.ID})`);
	console.log(`Found owner: ${Owner.Tag} (${Owner.ID})`);
	console.log(`Found ${Object.keys(Memory.Emojis).length - 1} emojis\n`);
	console.log(`Took ${EndTime - StartTime} ms`);
});

StartTime = performance.now();
Socket.Connect();
