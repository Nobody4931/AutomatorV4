export function RandomNum(Minimum, Maximum) {
	return Math.random() * (Maximum - Minimum) + Minimum;
}

export function RandomInt(Minimum, Maximum) {
	Minimum = Math.ceil(Minimum);
	Maximum = Math.floor(Maximum);
	return Math.floor(Math.random() * (Maximum - Minimum + 1)) + Minimum;
}

export function RandomStr(Length, Characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ0123456789") {
	let Result = "";
	for (let I = 0; I < Length; ++I)
		Result += Characters.charAt(RandomInt(0, Characters.length));
	return Result;
}

export function RandomCUUID(...Chunks) {
	return Chunks.map((C) => RandomStr(C)).join("-");
}

export function RandomUUID() {
	return RandomCUUID(8, 4, 4, 4, 12);
}
