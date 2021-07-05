/* Live Collector Class */
export class LiveCollector {
	constructor(Filter, Options = {}) {
		this.Started = false;
		this.Ended = false;
		this.Filter = Filter;
		this.Limit = Options.Limit;
		this.Duration = Options.Duration;
		this.CollCallback = null;
		this.StopCallback = null;
		this.Timer = null;
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

	Stop() {
		if (this.Timer != null)
			clearTimeout(this.Timer);
		if (this.StopCallback != null)
			this.StopCallback();
	}
};

/* Bulk Collector Class */
export class BulkCollector {
	constructor(Filter, Options) {
		this.Collected = [];
		this.Filter = Filter;
		this.Limit = Options.Limit;
		this.Callback = Options.Callback;
		this.Timer = Options.Duration != null
			? setTimeout(this.Stop.bind(this), Options.Duration)
			: null;
		this.Running = true;
	}

	Stop(_Index) {
		if (this.Running == false) return;
		this.Running = false;

		if (this.Timer != null)
			clearTimeout(this.Timer);
		if (this.Callback != null)
			this.Callback(this.Collected, _Index);
	}
};
