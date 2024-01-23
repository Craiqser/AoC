export const task = async () => {
	const lines = (await Bun.file('./2023/day23/assets/input.txt').text()).split('\n');
	const start = [0, lines[0].indexOf('.')], end = [lines.length - 1, lines[lines.length - 1].indexOf('.')], points = [start, end];
	const graph = {};

	lines.forEach((line, i) => {
		for (let j = 0; j < line.length; j++) {
			if (line[j] === "#") continue;

			let neighbors = 0;
			const dirs = [[i - 1, j], [i + 1, j], [i, j + 1], [i, j - 1]];
			for (const [row, col] of dirs) {
				if (row >= 0 && row < lines.length && col >= 0 && col < lines[0].length && lines[row][col] != "#")
					neighbors++;
			}
			if (neighbors > 2)
				points.push([i, j]);
		}
	});
	for (const pt of points) graph[pt] = [];

	for (const [pr, pc] of points) {
		const stack = [], passed = new Set();
		stack.push([pr, pc, 0]);
		passed.add(`${pr},${pc}`);

		while (stack.length > 0) {
			const [r, c, n] = stack.pop();
			const contain = points.some((v) => (v[0] === r && v[1] === c));
			if (n !== 0 && contain) {
				graph[`${pr},${pc}`].push([r, c, n]);
				continue;
			}
			for (const [dr, dc] of [[-1,0], [1,0], [0,1], [0,-1]]) {
				const [nr, nc] = [r + dr, c + dc];
				if (nr >= 0 && nr < lines.length && nc >=0 && nc < lines[0].length && lines[nr][nc] !== "#" && !passed.has(`${nr},${nc}`)) {
					stack.push([nr, nc, n + 1]);
					passed.add(`${nr},${nc}`);
				}
			}
		}
	}
	const passed = new Set();
	const dfs = (pt) => {
		if (pt[0] === end[0] && pt[1] === end[1]) {
			return 0;
		}
		let max = Number.NEGATIVE_INFINITY;
		passed.add(`${pt[0]},${pt[1]}`);

		for (const nx of graph[`${pt[0]},${pt[1]}`]) {
			if (!passed.has(`${nx[0]},${nx[1]}`)) {
				max = Math.max(max, dfs([nx[0], nx[1]]) + nx[2]);
			}
		}
		passed.delete(`${pt[0]},${pt[1]}`);
		return max;
	}

	console.log(dfs(start));
}
