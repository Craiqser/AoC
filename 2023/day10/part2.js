// test2 - 4
// test3 - 8
// test4 - 10
const map = (await Bun.file('./2023/day10/assets/test2.txt').text()).split('\n');
const queue = [];

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
				queue.push([row, col, 0]);
				if ('|7F'.includes(map[row - 1][col])) queue.push([row - 1, col, 1]);
				if ('|LJ'.includes(map[row + 1][col])) queue.push([row + 1, col, 1]);
				if ('-LF'.includes(map[row][col - 1])) queue.push([row, col - 1, 1]);
				if ('-J7'.includes(map[row][col + 1])) queue.push([row, col + 1, 1]);
				const steps = new Map();
				while (queue.length > 0) {
					const [r, c, s] = queue.pop();
					if (s < (steps.get(`${r}-${c}`) ?? Infinity)) {
						steps.set(`${r}-${c}`, s);
						nextStep(r, c).forEach(([r, c]) => queue.push([r, c, s + 1]));
					}
				}
				console.log(Math.max(...steps.values()));
			}
		}
	}
};
