export const task = async () => {
	const lines = (await Bun.file('./2023/day10/assets/test1.txt').text()).split('\n');
	lines.map((line, i) => lines[i] = line.split(''));
	const p = [0, 0];

	console.dir(lines);
};
