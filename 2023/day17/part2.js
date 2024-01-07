export const task = async () => {
	const map = (await Bun.file('./2023/day17/assets/test1.txt').text()).split('\n').map((row) => row.split('').map(Number));
	const lastRow = map.length - 1;
	const lastCol = map[0].length - 1;
	const steps = [[0, 1], [1, 0], [-1, 0], [0, -1]];
	const queue = [[0, 0, 0, 0, 0, 0]];
	const sortOrder = (a, b) => a[5] - b[5];
	const passed = new Set();
/*
	while (queue.length) {
		const [row, col, drow, dcol, len, cost] = queue.shift();
		if ((row === lastRow) && (col === lastCol)) {
			console.log(cost);
			break;
		}
		const key = `${row},${col},${drow},${dcol},${len}`;
		if (passed.has(key)) continue;
		passed.add(key);
		for (const [dr, dc] of steps) {
			const nextRow = row + dr;
			const nextCol = col + dc;
			if ((nextRow < 0) || (nextRow > lastRow) || (nextCol < 0) || (nextCol > lastCol)) continue;
			if ((dr === drow) && (dc === dcol)) {
				if (len < 3) {
					queue.push([nextRow, nextCol, dr, dc, len + 1, cost + map[nextRow][nextCol]]);
					queue.sort(sortOrder);
				}
			} else if ((dr !== -drow) || (dc !== -dcol)) {
				queue.push([nextRow, nextCol, dr, dc, 1, cost + map[nextRow][nextCol]]);
				queue.sort(sortOrder);
			}
		}
	}
*/
}
// 94
