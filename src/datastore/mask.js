import { RandomInt } from "../modules/functions/generator.js";


export function GenerateMask(Userdata) {
	for (let I = 0; I < 64; ++I) {
		Userdata.writeUInt8(RandomInt(1, 255), I);
	}
}

export function ApplyMask(Userdata) {
	for (let I = 64; I < Userdata.byteLength; ++I) {
		Userdata.writeUInt8(
			Userdata.readUInt8(I) ^ Userdata.readUInt8((I + 5387) % 64),
			I
		);
	}
}
