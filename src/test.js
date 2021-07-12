import {
	AutoInt8, AutoInt16, AutoInt32, AutoInt64,
	AutoUInt8, AutoUInt16, AutoUInt32, AutoUInt64
} from "./datastore/datatypes/integers.js";

import { AutoFloat, AutoDouble } from "./datastore/datatypes/decimals.js";
import { AutoString, AutoBigInt } from "./datastore/datatypes/others.js";
import { AutoArray, AutoObject } from "./datastore/datatypes/groups.js";

import AutoFormat from "./datastore/base.js";


let Structure = new AutoObject({
	Some: AutoString,
	Random: AutoUInt32,
	Dictionary: AutoBigInt,
	Object: AutoDouble,
	Thing: new AutoArray(AutoUInt8, AutoInt64)
});

let File = new AutoFormat("src/test.auto", Structure, false).Load();

console.log(File.Data);

File.Data = {};
File.Data.Some = "testing string weeeeeeeeeeeeeee";
File.Data.Random = 3056782515;
File.Data.Dictionary = 127821983612863127836129831623891623781523218538721631297361287312372153781231n;
File.Data.Object = 1337.42069696969;
File.Data.Thing = [
	12372198372139817n,
	83412831283123821n,
	21627362173622412n,
	47637868197312314n,
	49884567612783213n,
	38486783246217811n
];

File.Save();
