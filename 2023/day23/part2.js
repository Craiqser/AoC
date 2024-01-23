export const task = async () => {
	const lines = (await Bun.file('./2023/day23/assets/input.txt').text()).split('\n');
	let res = 0;
	const queue = [[0, 1, 0, ['0-1']]];

	console.log(res);
}
