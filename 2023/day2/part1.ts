export const task = async () => {
	let acc = 0;
	const lines = (await Bun.file('./2023/day2/assets/test1.txt').text()).split('\n');
	if (lines.length > 0) {
		console.log(lines);
	}
};
