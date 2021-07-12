import * as Mask from "./mask.js";
import Fs from "fs";

/* Static Auto File Formatter */
export class AutoFormat {
	constructor(FilePath, Structure, Array = false) {
		this.FilePath = FilePath;
		this.Struct = Structure;
		this.IsIter = Array;
		this.Data = null;
	}

	Load() {
		if (this.Data != null) return this;
		if (this.IsIter == true)
			this.Data = [];

		if (!Fs.existsSync(this.FilePath))
			return this;

		let FileData = Buffer.from(Fs.readFileSync(this.FilePath, { encoding: "binary" }), "binary");
		let Offset = 64;

		Mask.Apply(FileData);

		if (this.IsIter == true) {
			while (Offset < FileData.byteLength) {
				let ElementData = this.Struct.Read(FileData, Offset); Offset = ElementData[1];
				this.Data.push(ElementData[0]);
			}
		}

		else {
			this.Data = this.Struct.Read(FileData, Offset)[0];
		}

		return this;
	}

	Save() {
		let Bytes = 64; // wtf nice formatting
		if (this.IsIter == true) for (const Element of this.Data)
			Bytes += this.Struct.Calculate(Element);
		else
			Bytes += this.Struct.Calculate(this.Data);

		let FileData = Buffer.alloc(Bytes);
		let Offset = 64;

		Mask.Generate(FileData);

		if (this.IsIter == true) for (const Element of this.Data) {
			Offset = this.Struct.Write(FileData, Element, Offset);
		}

		else {
			Offset = this.Struct.Write(FileData, this.Data, Offset);
		}

		Mask.Apply(FileData);

		if (Fs.existsSync(this.FilePath))
			Fs.renameSync(this.FilePath, `${this.FilePath}.old`);
		Fs.writeFileSync(this.FilePath, FileData, { encoding: "binary" });

		return this;
	}
};

/* Dynamic Auto File Formatter */
export class AutoFormatD {
	constructor(NewFormat, OldFormat, Converter) {
		if (NewFormat.FilePath != OldFormat.FilePath)
			throw "FILEPATH_MISMATCH";

		this.NewFmt = NewFormat;
		this.OldFmt = OldFormat;
		this.Convert = Converter;
		this.Data = null;
	}

	Load() {
		this.OldFmt.Load();
		this.Data = this.Convert(this.OldFmt.Data);
		return this;
	}

	Save() {
		this.NewFmt.Data = this.Data;
		this.NewFmt.Save();
		return this;
	}
};
