// TODO:
// - Instead of a bunch of these manually written code that
//   can't be refactored even though it's practically the same,
//   let classes handle the data formatting instead
// - Format will obviously stay the same (Mostly)
// - Code generation will not
// 		- UserData = new AutoFormat({
//        		Name: AutoString,     <-- Auto____ is a CLASS, when in constructor it is called with the new keyword
//        		School: AutoUInt8,
//        		Year: AutoUInt8,
//        		Modifiers: [ AutoUInt8 ],    <-- List of AutoUInt8's (In format: SIZE, SIZE * ELEMENT)
//        		Rank: AutoUInt8,
//        		Color: AutoUInt8,
//        }, FORMAT_ONCE);
//      - TicketData = new AutoFormat({     <-- Uses the Array format, will be one element after the other until EOF
//        		### Haven't planned this far ahead yet,
//	        		can't think straight at 12 AM either ###
//        }, FORMAT_ARRAY);
// - On second thought, Auto____ don't have to be classes, they
//   can also be enums and the AutoFormat constructor will just
//   check it for them (Though classes = much neater codebase)
// - On third thought, AutoFormat could just be a normal function
//   aswell lol

// NOTE: First 64 bytes of each userdata file is a mask applied to the data

import { GenerateMask, ApplyMask } from "./mask.js";
import { BufferFromFile, ReadString16, WriteString16 } from "../modules/functions/util.js";

import * as ValueType from "./enums/users.js";

import Fs from "fs";


export const Data = {};
// .Name, .School, .Year, .Modifiers[], .Rank, .Color

/* Data Loading */
export function Load(UserID) {
	if (Data[UserID] != null)
		return Data[UserID];
	Data[UserID] = {};

	let Userfile = `db/users/${UserID}.auto`;
	if (!Fs.existsSync(Userfile))
		return Data[UserID];

	let Userdata = BufferFromFile(Userfile, { encoding: "binary" });
	let Offset = 64;

	if (Userdata.byteLength < 64)
		throw `${UserID}_USERDATA_CORRUPTED`;

	ApplyMask(Userdata);

	// Parse userdata
	while (Offset < Userdata.byteLength) {
		switch (Userdata.readUInt8(Offset++)) {

			case ValueType.NAME:
				let [ Name, NewOffset ] = ReadString16(Userdata, Offset);
				Data[UserID].Name = Name;
				Offset = NewOffset;
				break;

			case ValueType.SCHOOL:
				Data[UserID].School = Userdata.readUInt8(Offset++);
				break;

			case ValueType.GRAD_YEAR:
				Data[UserID].Year = Userdata.readUInt8(Offset++);
				break;

			case ValueType.MODIFIERS:
				let ModCount = Userdata.readUInt8(Offset++);
				Data[UserID].Modifiers = [];
				for (let I = 0; I < ModCount; ++I)
					Data[UserID].Modifiers.push(Userdata.readUInt8(Offset++));
				break;

			case ValueType.RANK:
				Data[UserID].Rank = Userdata.readUInt8(Offset++);
				break;

			case ValueType.COLOR:
				Data[UserID].Color = Userdata.readUInt8(Offset++);
				break;

		}
	}

	return Data[UserID];
}

/* Data Saving */
export async function Save() {
	let Threads = [];

	for (const UserID in Data) {
		Threads.push(new Promise((Resolve) => {
			// Calculate userdata size
			let DataLen = 64;
			if (Data[UserID].Name != null)
				DataLen += 1 + (Data[UserID].Name.length + 1) * 2;
			if (Data[UserID].School != null)
				DataLen += 1 + 1;
			if (Data[UserID].Year != null)
				DataLen += 1 + 1;
			if (Data[UserID].Modifiers != null)
				DataLen += 1 + 1 + Data[UserID].Modifiers.length;
			if (Data[UserID].Rank != null)
				DataLen += 1 + 1;
			if (Data[UserID].Color != null)
				DataLen += 1 + 1;

			// Generate userdata
			let Userfile = `db/users/${UserID}.auto`;
			let Userdata = Buffer.alloc(DataLen);
			let Offset = 64;

			GenerateMask(Userdata);

			if (Data[UserID].Name != null) {
				Offset = Userdata.writeUInt8(ValueType.NAME, Offset);
				Offset = WriteString16(Userdata, Data[UserID].Name, Offset);
			}

			if (Data[UserID].School != null) {
				Offset = Userdata.writeUInt8(ValueType.SCHOOL, Offset);
				Offset = Userdata.writeUInt8(Data[UserID].School, Offset);
			}

			if (Data[UserID].Year != null) {
				Offset = Userdata.writeUInt8(ValueType.GRAD_YEAR, Offset);
				Offset = Userdata.writeUInt8(Data[UserID].Year, Offset);
			}

			if (Data[UserID].Modifiers != null) {
				Offset = Userdata.writeUInt8(ValueType.MODIFIERS, Offset);
				Offset = Userdata.writeUInt8(Data[UserID].Modifiers.length, Offset);
				for (const Modifier of Data[UserID].Modifiers) {
					Offset = Userdata.writeUInt8(Modifier, Offset);
				}
			}

			if (Data[UserID].Rank != null) {
				Offset = Userdata.writeUInt8(ValueType.RANK, Offset);
				Offset = Userdata.writeUInt8(Data[UserID].Rank, Offset);
			}

			if (Data[UserID].Color != null) {
				Offset = Userdata.writeUInt8(ValueType.COLOR, Offset);
				Offset = Userdata.writeUInt8(Data[UserID].Color, Offset);
			}

			// Save to file
			ApplyMask(Userdata);
			if (Fs.existsSync(Userfile))
				Fs.renameSync(Userfile, `${Userfile}.old`);
			Fs.writeFileSync(Userfile, Userdata, { encoding: "binary" });

			Resolve();
		}));
	}

	await Promise.all(Threads);
}
