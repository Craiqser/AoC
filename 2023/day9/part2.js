export const task = async () => {
	const lines = (await Bun.file('./2023/day9/assets/input.txt').text()).split('\n');
	let sum = 0;
	lines.map((line) => {
		let row = line.split(' ').map(Number).reverse(), nextRow = [];
		let res = 0, v;
		while (!row.every((v) => v === 0)) {
			v = row.reduce((pre, cur) => {
				nextRow.push(cur - pre);
				return cur;
			});
			row = nextRow; nextRow = []; res += v;
		}
		sum += res;
	});
	console.log(sum);
};
