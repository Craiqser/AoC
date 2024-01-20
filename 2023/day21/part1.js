export const task = async () => {
	const lines = (await Bun.file('./2023/day21/assets/input.txt').text()).split('\n');
	const start = 'S', maxSteps = 64;
	let queue = [];
	lines.map((line, idx) => {
		if (line.includes(start)) queue.push([idx, line.indexOf(start), 0]);
	});

	for (let i = 0; i < maxSteps; i++) {
		const passed = new Set(), step = queue;
		queue = [];
		for (const [row, col] of step) {
			for (const [drow, dcol] of [[0, 1], [0, -1], [-1, 0], [1, 0]]) {
				const [nrow, ncol] = [row + drow, col + dcol];
				if (lines[nrow][ncol] !== '#' && !passed.has(`${nrow}-${ncol}`)) {
					passed.add(`${nrow}-${ncol}`);
					queue.push([nrow, ncol]);
				}
			}
		}
	}
	console.log(queue.length);
}
