export const task = async () => {
	const lines = (await Bun.file('./2023/day21/assets/input.txt').text()).split('\n');
	const steps = 26501365, size = lines.length, pStart = [(size - 1) / 2, (size - 1) / 2];

	const calc = (srow, scol, steps) => {
		let queue = [[srow, scol]];
		for (let i = 0; i < steps; i++) {
			const passed = new Set();
			let queue_curr = queue;
			queue = [];
			for (const [row, col] of queue_curr) {
				for (const [drow, dcol] of [[0, 1], [0, -1], [-1, 0], [1, 0]]) {
					let [nrow, ncol] = [row + drow, col + dcol];
					if (lines[nrow] !== undefined && lines[nrow][ncol] !== undefined) {
						if ((lines[nrow][ncol] !== '#') && (!passed.has(`${nrow}-${ncol}`))) {
							passed.add(`${nrow}-${ncol}`);
							queue.push([row + drow, col + dcol]);
						}
					}
				}
			}
		}
		return queue.length;
	}
	const gridWidth = Math.floor(steps / size - 1);
	const odd = Math.pow(Math.floor(gridWidth / 2) * 2 + 1, 2);
	const even = Math.pow(Math.floor((gridWidth + 1) / 2) * 2, 2);

	const oddPoints = calc(pStart[0], pStart[1], size * 2 + 1);
	const evenPoints = calc(pStart[0], pStart[1], size * 2);

	const cornerT = calc(size - 1, pStart[1], size - 1);
	const cornerR = calc(pStart[0], 0, size - 1);
	const cornerB = calc(0, pStart[1], size - 1);
	const cornerL = calc(pStart[0], size - 1, size - 1);

	const smallTR = calc(size - 1, 0, Math.floor(size / 2) - 1);
	const smallTL = calc(size - 1, size - 1, Math.floor(size / 2) - 1);
	const smallBR = calc(0, 0, Math.floor(size / 2) - 1);
	const smallBL = calc(0, size - 1, Math.floor(size / 2) - 1);

	const largeTR = calc(size - 1, 0, Math.floor(size * 3 / 2) - 1);
	const largeTL = calc(size - 1, size - 1, Math.floor(size * 3 / 2) - 1);
	const largeBR = calc(0, 0, Math.floor(size * 3 / 2) - 1);
	const largeBL = calc(0, size - 1, Math.floor(size * 3 / 2) - 1);

	console.log(odd * oddPoints + even * evenPoints
		+ cornerT + cornerR + cornerB + cornerL
		+ (gridWidth + 1) * (smallTR + smallTL + smallBR + smallBL)
		+ gridWidth * (largeTR + largeTL + largeBR + largeBL)
	);
}
