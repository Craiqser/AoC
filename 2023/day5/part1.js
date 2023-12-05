export const task = async () => {
	const lines = (await Bun.file('./2023/day5/assets/test1.txt').text()).split('\n');
	const seeds = lines[0].split(':')[1].trim().split(' ').map(Number);
	const converters = new Map();
	let groupNum = -1;

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
		for (let i = 0; i < groupNum; i++) {
			const arr = converters.get(i);
			for (let j = 0; j < arr.length; j++) {
				if (res >= arr[j][1] && res < arr[j][1] + arr[j][2]) {
					res = arr[j][0] + res - arr[j][1];
					break;
				}
			}
			console.log(res);
		}
		break;
	}
	// console.log(convertations);
};
/*
Seed 79, soil 81, fertilizer 81, water 81, light 74, temperature 78, humidity 78, location 82.
Seed 14, soil 14, fertilizer 53, water 49, light 42, temperature 42, humidity 43, location 43.
Seed 55, soil 57, fertilizer 57, water 53, light 46, temperature 82, humidity 82, location 86.
Seed 13, soil 13, fertilizer 52, water 41, light 34, temperature 34, humidity 35, location 35.
*/
