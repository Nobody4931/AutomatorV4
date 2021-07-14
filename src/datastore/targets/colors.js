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
	R: AutoUInt8,
	G: AutoUInt8,
	B: AutoUInt8,
	Role: AutoUInt64
});

const OldStructure = NewStructure;


export const Data = new AutoFormatD(
	new AutoFormat("db/bot/colors.auto", NewStructure, true),
	new AutoFormat("db/bot/colors.auto", OldStructure, true),
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
