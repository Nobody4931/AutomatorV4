import {
	AutoInt8, AutoInt16, AutoInt32, AutoInt64,
	AutoUInt8, AutoUInt16, AutoUInt32, AutoUInt64
} from "../datatypes/integers.js";

import { AutoFloat, AutoDouble } from "../datatypes/decimals.js";
import { AutoString, AutoBigInt } from "../datatypes/others.js";
import { AutoArray, AutoObject } from "../datatypes/groups.js";

import { AutoFormat, AutoFormatD } from "../base.js";

import { Sleep } from "../../modules/functions/util.js";
import * as Options from "../../config.js";

import Fs from "fs";


const NewStructure = new AutoObject({
	Name: AutoString,
	School: AutoUInt8,
	Year: AutoUInt8,
	Modifiers: new AutoArray(AutoUInt8, AutoUInt8),
	Rank: AutoUInt8,
	Color: AutoUInt8
});

const OldStructure = NewStructure;


export const Data = {};
export var Loaded = false;

export function Load(UserID) {
	let Path = `db/users/${UserID}.auto`;

	Data[UserID] = new AutoFormatD(
		new AutoFormat(Path, NewStructure, false),
		new AutoFormat(Path, OldStructure, false),
		(OldData) => OldData).Load();

	if (Data[UserID].Data == null)
	Data[UserID].Data = {};

	if (Data[UserID].Data.Name == null)
	Data[UserID].Data.Name = "Undefined";

	if (Data[UserID].Data.School == null)
	Data[UserID].Data.School = 0;

	if (Data[UserID].Data.Year == null)
	Data[UserID].Data.Year = 0;

	if (Data[UserID].Data.Modifiers == null)
	Data[UserID].Data.Modifiers = [];

	if (Data[UserID].Data.Rank == null)
	Data[UserID].Data.Rank = 0;

	if (Data[UserID].Data.Color == null)
	Data[UserID].Data.Color = 0;

	return Data[UserID].Save();
}

export async function Get(UserID) {
	while (Loaded == false)
		await Sleep(50);
	return Load(UserID).Data;
}


/* Initialize Data */
let Threads = [];
for (const UserFile of Fs.readdirSync("db/users"))
	if (UserFile.endsWith(".auto"))
		Threads.push(new Promise((Resolve) => Resolve(
			Load(UserFile.substr(0, UserFile.length - 5)) )));
await Promise.all(Threads);

setInterval(() => {
	for (const UserID in Data) {
		Data[UserID].Save();
	}
}, Options.SaveTime);

Loaded = true;
