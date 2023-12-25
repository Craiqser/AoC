const map = (await Bun.file('./2023/day10/assets/input.txt').text()).split('\n');

const nextStep = (row, col) => {
	switch (map[row][col]) {
		case '|': return [[row - 1, col], [row + 1, col]];
		case '-': return [[row, col - 1], [row, col + 1]];
		case 'L': return [[row - 1, col], [row, col + 1]];
		case 'J': return [[row - 1, col], [row, col - 1]];
		case '7': return [[row + 1, col], [row, col - 1]];
		case 'F': return [[row + 1, col], [row, col + 1]];
		default: return [];
	}
};

export const task = async () => {
	map.map((line, i) => map[i] = line.split(''));
	for (let row = 0; row < map.length; row++) {
		for (let col = 0; col < map[row].length; col++) {
			if (map[row][col] === 'S') {
				const queue = [];
				queue.push([row, col, 0]);
				if ((row > 0) && '|7F'.includes(map[row - 1][col] ?? '+')) queue.push([row - 1, col, 1]);
				if ((row < map.length - 1) && '|LJ'.includes(map[row + 1][col] ?? '+')) queue.push([row + 1, col, 1]);
				if ((col > 0) && '-LF'.includes(map[row][col - 1] ?? '+')) queue.push([row, col - 1, 1]);
				if ((col < map[row].length - 1) && '-J7'.includes(map[row][col + 1] ?? '+')) queue.push([row, col + 1, 1]);
				const steps = new Map();
				while (queue.length > 0) {
					const [r, c, s] = queue.pop();
					if (s < (steps.get(`${r}-${c}`) ?? Infinity)) {
						steps.set(`${r}-${c}`, s);
						nextStep(r, c).forEach(([r, c]) => queue.push([r, c, s + 1]));
					}
				}
				let area = 0;
				map.map((line, row) => {
					let inside = false;
					line.map((val, col) => {
						if (steps.has(`${row}-${col}`) && ('|LJ'.includes(val))) inside = !inside;
						if (!steps.has(`${row}-${col}`) && inside) area += 1;
					});
				});
				console.log(area);
				return;
			}
		}
	}
};
