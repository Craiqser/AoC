// Краткий, но медленный вариант (только для небольших карт).
export const task = async () => {
	const lines = (await Bun.file('./2023/day23/assets/input.txt').text()).split('\n');
	let res = 0;
	const queue = [[0, 1, 0, ['0-1']]];
	const next = (row, col, step, path) => {
		const key = `${row}-${col}`;
		if (path.includes(key)) return;
		queue.push([row, col, ++step, [...path, key]]);
	};
	while (queue.length) {
		const [row, col, step, path] = queue.pop();
		if ((row > 0) && (lines[row - 1][col] !== '#'))
			next(row - 1, col, step, path);

		if ((row < lines.length - 1) && (lines[row + 1][col] !== '#'))
			next(row + 1, col, step,  path);

		if ((col > 0) && (lines[row][col - 1] !== '#'))
			next(row, col - 1, step, path);

		if ((col < lines[0].length - 1) && (lines[row][col + 1] !== '#'))
			next(row, col + 1, step, path);

		if ((row === lines.length - 1) && (col === lines[0].length - 2))
			res = Math.max(res, step);
	}
	console.log(res);
}
