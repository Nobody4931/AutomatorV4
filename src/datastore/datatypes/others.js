import { FastLog2 } from "../../modules/functions/util.js";

/* Strings */
export const AutoString = {
	["Read"]: function(Buffer, Offset) {
		let Result = "";

		while (true) {
			let CharCode = Buffer.readUInt16LE(Offset); Offset += 2;
			if (CharCode == 0) break;
			Result += String.fromCharCode(CharCode);
		}

		return [ Result, Offset ];
	},

	["Write"]: function(Buffer, Data, Offset) {
		for (let I = 0; I < Data.length; ++I)
			Offset = Buffer.writeUInt16LE(Data.charCodeAt(I), Offset);
		return Buffer.writeUInt16LE(0, Offset);
	},

	["Calculate"]: function(Data) {
		return 2 * (Data.length + 1);
	}
};

/* Big Integers */
export const AutoBigInt = {
	["Read"]: function(Buffer, Offset) {
		let Bytes = Buffer.readUInt16LE(Offset); Offset += 2;
		let Result = 0n;
		let Multi = 1n;

		for (let I = 0; I < Bytes; ++I) {
			Result |= BigInt(Buffer.readUInt8(Offset)) * Multi;
			Multi <<= 1;
			++Offset;
		}

		if (Buffer.readUInt8(Offset) != 0)
			Result *= -1;

		return [ Result, Offset + 1 ];
	},

	["Write"]: function(Buffer, Data, Offset) {
		let Negative = Data < 0;
		if (Negative == true)
			Data *= -1n;

		let Bytes = FastLog2(Data) + 1;
		Offset = Buffer.writeUInt16LE(Bytes, Offset);

		for (let I = 0; I < Bytes; ++I) {
			Offset = Buffer.writeUInt8(Data & 0b11111111n, Offset);
			Data >>= 8;
		}

		return Buffer.writeUInt8(Negative ? 1 : 0, Offset);
	},

	["Calculate"]: function(Data) {
		return 2 + FastLog2(Data) + 1 + 1;
	}
};
