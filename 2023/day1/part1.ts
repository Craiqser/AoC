export const task = async () => {
	let acc = 0, left = 0, right = 0;
	const buffer = Bun.file('./2023/day1/assets/input.txt').arrayBuffer();
	const bytes = new Uint8Array(await buffer);

	for (const byte of bytes) {
		if (byte === 10) {
			acc += left * 10 + right;
			left = 0;
			right = 0;
			continue;
		}
		if (byte > 47 && byte < 58) {
			const digit = byte - 48;
			left = left > 0 ? left : digit;
			right = digit;
		}
	}

	console.log(acc);
};
