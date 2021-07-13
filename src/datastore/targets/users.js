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

	return Data[UserID] = new AutoFormatD(
		new AutoFormat(Path, NewStructure, false),
		new AutoFormat(Path, OldStructure, false),
		(OldData) => {
			if (OldData == null)
				OldData = {};

			if (OldData.Name == null)
				OldData.Name = "";

			if (OldData.School == null)
				OldData.School = 0;

			if (OldData.Year == null)
				OldData.Year = 0;

			if (OldData.Modifiers == null)
				OldData.Modifiers = [];

			if (OldData.Rank == null)
				OldData.Rank = 0;

			if (OldData.Color == null)
				OldData.Color = 0;

			return OldData;
		}).Load().Save();
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
