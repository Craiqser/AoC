export const task = async () => {
	const lines = (await Bun.file('./2023/day8/assets/input.txt').text()).split('\n');
	const dirs = lines[0].split('');
	const map = {};
	let step = 0, key = 'AAA';
	for (let i = 2; i < lines.length; i++) {
		const parts = lines[i].split(' = (');
		map[parts[0]] = parts[1].slice(0, 8).split(', ');
	}
	while (key !== 'ZZZ') {
		const idx = (dirs[step++ % dirs.length] === 'L') ? 0 : 1;
		key = map[key][idx];
	}
	console.log(step);
};
