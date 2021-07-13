export const Epoch  = new Date(1970, 0).getTime();
export const DEpoch = new Date(2015, 0).getTime();

export function FromDate(Time) {
	return BigInt(Time.getTime() - DEpoch) << 22n;
}

export function ToDate(Snowflake) {
	return new Date(Number( (Snowflake >> 22n) + BigInt(DEpoch) ));
}
