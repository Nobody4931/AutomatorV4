export async function Sleep(Milliseconds) {
	return new Promise((Resolve) => setTimeout(Resolve, Milliseconds));
}
