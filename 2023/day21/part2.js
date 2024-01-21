export const task = async () => {
	const lines = (await Bun.file('./2023/day21/assets/test1.txt').text()).split('\n');
	const start = 'S', maxSteps = 10, rowMax = lines.length, colMax = lines[0].length;
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
/*
In exactly 6 steps, he can still reach 16 garden plots.
In exactly 10 steps, he can reach any of 50 garden plots.
In exactly 50 steps, he can reach 1594 garden plots.
In exactly 100 steps, he can reach 6536 garden plots.
In exactly 500 steps, he can reach 167004 garden plots.
In exactly 1000 steps, he can reach 668697 garden plots.
In exactly 5000 steps, he can reach 16733044 garden plots.
26501365 steps
*/
