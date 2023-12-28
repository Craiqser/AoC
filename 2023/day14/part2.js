import { cycle } from './cycle.js';

export const task = async () => {
	const map = (await Bun.file('./2023/day14/assets/input.txt').text()).split('\n');
	map.map((line, i) => map[i] = line.split(''));
	const yMax = map.length, xMax = map[0].length, maps = new Map(), iMax = 1_000_000_000;

	for (let i = 1; i <= iMax; i++) {
		const hash = cycle(map, xMax, yMax);
		if (maps.has(hash)) {
			const len = i - maps.get(hash);
			let rest = (iMax - i) % len;
			while (--rest >= 0) cycle(map, xMax, yMax);
			break;
		}
		maps.set(hash, i);
	}
	console.log(map.reduce((acc, line, idx) => acc + line.filter((cell) => cell === 'O').length * (yMax - idx), 0));
};
