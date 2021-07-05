// https://discord.com/developers/docs/topics/gateway#message-create
// -> https://discord.com/developers/docs/resources/channel#message-object
import * as BaseCollector from "./base.js";

export const ActiveC = [];
export const ActiveF = [];

/* Collector Class */
export class Collector extends BaseCollector.LiveCollector {
	constructor(Filter, Options = {}) {
		super(Filter, Options);

		ActiveC.push(this);
	}

	Stop(_Index) {
		if (this.Ended == true) return;
		this.Ended = true;

		ActiveC.splice(_Index ?? ActiveC.findIndex((V) => (V == this)), 1);
		super.Stop();
	}
};

/* Collector Function */
export async function Collect(Filter, Options = {}) {
	return new Promise((Resolve) => {
		let Collector = new BaseCollector.BulkCollector(Filter, {
			Limit: Options.Limit,
			Duration: Options.Duration,
			Callback: (Collected, _Index) => {
				ActiveF.splice(_Index ?? ActiveF.findIndex((V) => (V == Collector)), 1);
				Resolve(Collected);
			}
		});

		ActiveF.push(Collector);
	});
}
