export const task = async () => {
	const lines = (await Bun.file('./2023/day10/assets/test1.txt').text()).split('\n');

	console.dir(lines);
};
