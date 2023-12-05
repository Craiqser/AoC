export const task = async () => {
	const lines = (await Bun.file('./2023/day5/assets/input.txt').text()).split('\n');
	const seeds = lines[0].split(':')[1].trim().split(' ').map(Number);
	const converters = new Map(), results = [];
	let groupNum = 0;

	for (let i = 2; i < lines.length; i++) {
		const line = lines[i];
		if (line.length === 0) continue;
		if (line.includes(' map:')) {
			groupNum++;
		} else {
			const arr = converters.get(groupNum) ?? [];
			arr.push(line.split(' ').map(Number));
			converters.set(groupNum, arr);
		}
	}
	for (const seed of seeds) {
		let res = seed;
		for (let i = 1; i <= groupNum; i++) {
			const arr = converters.get(i);
			for (let j = 0; j < arr.length; j++) {
				if (res >= arr[j][1] && res < arr[j][1] + arr[j][2]) {
					res = arr[j][0] + res - arr[j][1];
					break;
				}
			}
		}
		results.push(res);
	}
	console.log(Math.min(...results));
};
