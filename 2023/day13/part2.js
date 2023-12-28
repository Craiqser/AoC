import { rotate90 } from './../day11/part1';

const reflect = (pattern, original = 0) => {
	for (let i = 0; i < pattern.length - 1; i++) {
		if ((i + 1) === original) continue;

		if (pattern[i] === pattern[i + 1]) {
			let res = i + 1;
			for (let j = 1; j <= Math.min(pattern.length - i - 2, i); j++) {
				if (pattern[i - j] !== pattern[i + j + 1]) {
					res = 0;
					break;
				}
			}
			if (res) return res;
		}
	}
	return 0;
};

const smudge = (arr, original) => {
	let res = 0, len = arr[0].length;

	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < len; j++) {
			arr[i][j] = (arr[i][j] === '.') ? '#' : '.';
			res = reflect(arr.map((line) => line.join('')), original);
			arr[i][j] = (arr[i][j] === '.') ? '#' : '.';
			if (res) return res;
		}
	}
	return 0;
};

const process = (pattern) => {
	let original = reflect(pattern);
	let res = 100 * smudge(pattern.map((line) => line.split('')), original);
	if (res) return res;
	else {
		const arr = rotate90(pattern.map((line) => line.split('')));
		original = reflect(arr.map((line) => line.join('')));
		res = smudge(arr, original);
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
