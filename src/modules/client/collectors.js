/* Live Collector Class */
class LiveCollector {
	constructor(List, Filter, Options = {}) {
		this.Started = false;
		this.Ended = false;

		this.List = List;
		this.Filter = Filter;
		this.Limit = Options.Limit;
		this.Duration = Options.Duration;

		this.Timer = null;
		this.CallbackCol = null;
		this.CallbackEnd = null;

		this.List.push(this);
	}

	OnCollect(Callback) {
		this.CallbackCol = Callback;
	}

	OnStop(Callback) {
		this.CallbackEnd = Callback;
	}

	Start() {
		this.Started = true;
		this.Ended = false;

		if (this.Duration != null) {
			this.Timer = setTimeout(this.Stop.bind(this), this.Duration);
		}
	}

	Stop(_Index) {
		if (this.Ended == true) return;
		this.Ended = true;

		this.List.splice(_Index ?? this.List.findIndex((Item) => (Item == this)), 1);

		if (this.Timer != null)
			clearTimeout(this.Timer);
		if (this.CallbackEnd != null)
			this.CallbackEnd();
	}
};

/* Bulk Collector Class */
class BulkCollector {
	constructor(List, Filter, Options = {}) {
		this.Collected = [];

		this.List = List;
		this.Filter = Filter;
		this.Limit = Options.Limit;
		this.Callback = Options.Callback;
		this.Timer = Options.Duration != null
			? setTimeout(this.Stop.bind(this), Options.Duration)
			: null;

		this.Ended = false;

		this.List.push(this);
	}

	Stop(_Index) {
		if (this.Ended == true) return;
		this.Ended = true;

		this.List.splice(_Index ?? this.List.findIndex((Item) => (Item == this)), 1);

		if (this.Timer != null)
			clearTimeout(this.Timer);
		if (this.Callback != null)
			this.Callback(this.Collected);
	}
};

/* Generate Collector Function */
export function GenerateCollector() {
	const ActiveLive = [];
	const ActiveBulk = [];

	return class extends LiveCollector {
		static ActiveLive = ActiveLive;
		static ActiveBulk = ActiveBulk;

		static Collect(Filter, Options = {}) {
			return new Promise((Resolve) => {
				Options.Callback = Resolve;
				new BulkCollector(ActiveBulk, Filter, Options);
			});
		}

		constructor(Filter, Options = {}) {
			super(ActiveLive, Filter, Options);
		}
	};
}

export const Message = GenerateCollector();
export const Reaction = GenerateCollector();
export const Interaction = GenerateCollector();
