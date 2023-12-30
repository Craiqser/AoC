export const task = async () => {
	const map = (await Bun.file('./2023/day17/assets/test1.txt').text()).split('\n').map((row) => row.split('').map(Number));
	const queue = [[0, 0]];

	while (queue.length) {
		const [row, col] = queue.pop();
	}
	console.log(map);
}
// 102
