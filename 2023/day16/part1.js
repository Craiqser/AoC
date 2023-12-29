export const task = async () => {
	const map = (await Bun.file('./2023/day16/assets/input.txt').text()).split('\n').map((row) => row.split(''));
	const queue = [[0, 0, 0, 1]];
	const passed = new Set();
	const res = new Set();

	while (queue.length) {
		const [row, col, drow, dcol] = queue.pop();
		const key = `${row},${col},${drow},${dcol}`;
		if (passed.has(key)) continue;

		passed.add(key);
		res.add(`${row},${col}`);
		const next = [];

		switch(map[row][col]) {
			case '/':
				next.push([-dcol, -drow]);
				break;
			case '\\':
				next.push([dcol, drow]);
				break;
			case '|':
				if (dcol) {
					next.push([-1, 0]);
					next.push([1, 0]);
				} else {
					next.push([drow, dcol]);
				}
				break;
			case '-':
				if (drow) {
					next.push([0, 1]);
					next.push([0, -1]);
				} else {
					next.push([drow, dcol]);
				}
				break;
			default:
				next.push([drow, dcol]);
				break;
		}

		next.forEach((v) => {
			const nrow = row + v[0], ncol = col + v[1];
			if (nrow > -1 && nrow < map.length && ncol > -1 && ncol < map[0].length) {
				queue.push([nrow, ncol, v[0], v[1]]);
			}
		});
	}
	console.log(res.size);
};
