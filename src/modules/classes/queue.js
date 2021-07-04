export class Queue {
	constructor() {
		this.Elements = [];
		this.Offset = 0;
	}

	Enqueue(Item) {
		this.Elements.push(Item);
	}

	Dequeue() {
		if (this.Elements.length == 0)
			return undefined;

		let Item = this.Elements[this.Offset];

		if (++this.Offset * 2 >= this.Elements.length) {
			this.Elements = this.Elements.slice(this.Offset);
			this.Offset = 0;
		}

		return Item;
	}

	Size() {
		return this.Elements.length - this.Offset;
	}

	Front() {
		if (this.Elements.length == 0)
			return undefined;
		return this.Elements[this.Offset];
	}

	Back() {
		if (this.Elements.length == 0)
			return undefined;
		return this.Elements[this.Elements.length - 1];
	}
};
