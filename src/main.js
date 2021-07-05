import * as Socket from "./modules/api/socket.js";
import * as Dispatcher from "./modules/client/dispatcher.js";

let StartingTime = null;

Dispatcher.AddHandler("READY", async () => {
	let EndingTime = performance.now();

	console.log(`client is ready`);
	console.log(`took ${EndingTime - StartingTime} ms`);
});

console.log("starting...");

StartingTime = performance.now();
Socket.Connect();
