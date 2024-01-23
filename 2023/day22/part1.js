export const task = async () => {
	const lines = (await Bun.file('./2023/day22/assets/test1.txt').text()).split('\n');
	const bricks = lines.map((line) => line.replace('~', ',').split(',').map(Number));
	console.log(bricks);
}
