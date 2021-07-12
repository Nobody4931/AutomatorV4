/* Arrays */
export class AutoArray {
	constructor(SizeType, Structure) {
		this.SizeT = SizeType;
		this.Struct = Structure;
	}

	Read(Buffer, Offset) {
		let CountData = this.SizeT.Read(Buffer, Offset); Offset = CountData[1];
		let Count = CountData[0];
		let Result = [];

		for (let I = 0; I < Count; ++I) {
			let ElementData = this.Struct.Read(Buffer, Offset); Offset = ElementData[1];
			Result.push(ElementData[0]);
		}

		return [ Result, Offset ];
	}

	Write(Buffer, Data, Offset) {
		Offset = this.SizeT.Write(Buffer, Data.length, Offset);
		for (const Element of Data)
			Offset = this.Struct.Write(Buffer, Element, Offset);
		return Offset;
	}

	Calculate(Data) {
		let Bytes = this.SizeT.Calculate(Data.length);
		for (const Element of Data)
			Bytes += this.Struct.Calculate(Element);
		return Bytes;
	}
};

/* Objects */
export class AutoObject {
	constructor(Structure) {
		this.Struct = Structure;
	}

	Read(Buffer, Offset) {
		let Result = {};

		for (const Key in this.Struct) {
			let ElementData = this.Struct[Key].Read(Buffer, Offset); Offset = ElementData[1];
			Result[Key] = ElementData[0];
		}

		return [ Result, Offset ];
	}

	Write(Buffer, Data, Offset) {
		for (const Key in this.Struct)
			Offset = this.Struct[Key].Write(Buffer, Data[Key], Offset);
		return Offset;
	}

	Calculate(Data) {
		let Bytes = 0;
		for (const Key in this.Struct)
			Bytes += this.Struct[Key].Calculate(Data[Key]);
		return Bytes;
	}
};
