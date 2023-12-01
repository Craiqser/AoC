export const part1 = async () => {
	let acc = 0;
	let left: number | null = null;
	let right: number | null = null;

	const buffer = Bun.file('./2023/day1/input.txt').arrayBuffer();
	const bytes = new Uint8Array(await buffer);

	for (const byte of bytes) {
		if (byte === 10) {
			acc += parseInt('' + left?.toString() + right?.toString());
			left = null;
			right = null;
			continue;
		}
		if (byte > 47 && byte < 58) {
			left = left ?? byte - 48;
			right = byte - 48;
		}
	}

	console.log(acc);
};

export const part2 = async () => {
	let acc = 0;
	const lines = (await Bun.file('./2023/day1/input.txt').text()).split('\n');
	lines.forEach((line) => {
		console.log(line);
	});
	console.log(acc);
};
