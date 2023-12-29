export const task = async () => {
	const lines = (await Bun.file('./2023/day16/assets/test1.txt').text()).split(',');
	console.log(lines);
};
