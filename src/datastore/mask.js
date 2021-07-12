import { RandomInt } from "../modules/functions/generator.js";

export function Generate(Buffer) {
	for (let I = 0; I < 64; ++I) {
		Buffer.writeUInt8(RandomInt(1, 255), I);
	}
}

export function Apply(Buffer) {
	for (let I = 64; I < Buffer.byteLength; ++I) {
		Buffer.writeUInt8(
			Buffer.readUInt8(I) ^ Buffer.readUInt8((I * 37) % 64),
			I);
	}
}
