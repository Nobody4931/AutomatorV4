// https://discord.com/developers/docs/topics/gateway#commands-and-events-gateway-events
export const Handlers = {};

export function AddHandler(Event, Callback) {
	if (typeof Event == "string") {
		Handlers[Event] = Handlers[Event] ?? [];
		Handlers[Event].push(Callback);
	} else for (const Evt of Event) {
		Handlers[Evt] = Handlers[Evt] ?? [];
		Handlers[Evt].push(Callback);
	}
}

export function Dispatch(Event, Data) {
	if (Handlers[Event] == null) return;
	for (const Handler of Handlers[Event]) {
		Handler(Data);
	}
}
