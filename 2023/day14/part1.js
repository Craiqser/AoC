export const task = async () => {
	const map = (await Bun.file('./2023/day14/assets/input.txt').text()).split('\n');
	const yMax = map.length;
	let res = 0;
	for (let x = 0; x < map[0].length; x++) {
		let weight = yMax;
		for (let y = 0; y < yMax; y++) {
			if (map[y][x] === '#') weight = yMax - y - 1;
			if (map[y][x] === 'O') res += weight--;
		}
	}
	console.log(res);
};
