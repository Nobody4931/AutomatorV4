export const ActiveC = [];
export const ActiveF = [];

/* Collector Class */
export class Collector {
	constructor(Filter, Options = {}) {
		this.Started = false;
		this.Ended = false;
		this.Filter = Filter;
		this.Limit = Options.Limit;
		this.Duration = Options.Duration;
		this.CollCallback = null;
		this.StopCallback = null;
		this.Timer = null;

		ActiveC.push(this);
	}

	OnCollect(Callback) {
		this.CollCallback = Callback;
	}

	OnStop(Callback) {
		this.StopCallback = Callback;
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

		ActiveC.splice(_Index ?? ActiveC.findIndex((V) => (V == this)), 1);

		if (this.Timer != null)
			clearTimeout(this.Timer);
		if (this.StopCallback != null)
			this.StopCallback();
	}
};

/* Collector Function */
export async function Collect(Filter, Options) {
	return new Promise((Resolve) => {
		let CollectionTask = {};
		CollectionTask.Collected = [];
		CollectionTask.Filter = Filter;
		CollectionTask.Limit = Options.Limit;
		CollectionTask.Timer = null;

		CollectionTask.Stop = function(_Index) {
			if (CollectionTask.Timer != null)
				clearTimeout(CollectionTask.Timer);
			ActiveF.splice(_Index ?? ActiveF.findIndex((V) => (V == CollectionTask)), 1);
			Resolve(CollectionTask.Collected);
		}

		if (Options.Duration != null)
			CollectionTask.Timer = setTimeout(CollectionTask.Stop, Options.Duration);

		ActiveF.push(CollectionTask);
	});
}
