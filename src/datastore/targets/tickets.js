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


const NewStructure = new AutoObject({
	ID: AutoString,
	User: AutoUInt64,
	Channel: AutoUInt64,
	Name: AutoString,
	School: AutoString,
	Year: AutoString,
	Extra: AutoString
});

const OldStructure = NewStructure;


export const Data = new AutoFormatD(
	new AutoFormat("db/bot/tickets.auto", NewStructure, true),
	new AutoFormat("db/bot/tickets.auto", OldStructure, true),
	(OldData) => (OldData)).Load().Save();
export var Loaded = false;

export async function Get() {
	while (Loaded == false)
		await Sleep(50);
	return Data.Data;
}

/* Initialize Data */
setInterval(Data.Save.bind(Data), Options.SaveTime);

Loaded = true;
