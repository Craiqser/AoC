export const task = async () => {
	const directions = { R: [0, 1], L: [0, -1], U: [-1, 0], D: [1, 0] };
	const lines = (await Bun.file('./2023/day18/assets/input.txt').text()).split('\n').map((row) => row.split(' '));
	let row = 0, col = 0, len = 0, res = 0;
	const plan = lines.map((line) => [...directions[line[0]], parseInt(line[1])])
		.map(([dr, dc, n]) => {
			row += dr * n;
			col += dc * n;
			len += n;
			return [row, col];
		});

	for (let i = 0; i < plan.length - 1; i++) {
		res += plan[i][1] * plan[i + 1][0] - plan[i + 1][1] * plan[i][0];
	}
	res = Math.abs(res / 2)
	console.log(len + (res + 1 - len / 2));
}
