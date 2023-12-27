import { rotate90 } from './../day11/part1';

const reflect = (pattern) => {
	let res = 0;
	for (let i = 0; i < pattern.length - 1; i++) {
		if (pattern[i] === pattern[i + 1]) {
			res = i + 1;
			for (let j = 1; j <= Math.min(pattern.length - i - 2, i); j++) {
				if (pattern[i - j] !== pattern[i + j + 1]) {
					res = 0;
					break;
				}
			}
			if (res) {
				return res;
			}
		}
	}
	return res;
};

const process = (pattern) => {
	let res = 100 * reflect(pattern);
	if (!res) {
		let arr = pattern.map((line) => line.split(''));
		res = reflect(rotate90(arr).map((line) => line.join('')));
	}
	return res;
};

export const task = async () => {
	const patterns = (await Bun.file('./2023/day13/assets/input.txt').text()).split('\n\n');
	console.log(patterns.reduce((acc, pattern) => {
		acc += process(pattern.split('\n'));
		return acc;
	}, 0));
};
