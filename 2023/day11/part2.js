const EXPANSION = 1_000_000;
let exRows = [], exCols = [];

const dist = (coord1, coord2, exp) => {
	let res = Math.abs(coord1[0] - coord2[0]) + Math.abs(coord1[1] - coord2[1]);

	let max = Math.max(coord1[0], coord2[0]);
	for (let i = Math.min(coord1[0], coord2[0]) + 1; i < max; i++) {
		if (exRows.includes(i)) {
			res += exp;
		}
	}
	max = Math.max(coord1[1], coord2[1]);
	for (let i = Math.min(coord1[1], coord2[1]) + 1; i < max; i++) {
		if (exCols.includes(i)) {
			res += exp;
		}
	}
	return res;
};

const rotate90 = (arr) => {
	const res = [];
	arr.map((row, r) => row.map((val, c) => {
		if (!res[c]) {
			res[c] = [];
		}
		res[c][arr.length - r - 1] = val;
	}));
	return res;
};

export const task = async () => {
	let lines = (await Bun.file('./2023/day11/assets/input.txt').text()).split('\n');
	let universe = [];
	lines.map((row, r) => {
		if (!row.includes('#')) {
			exCols.push(lines.length - r - 1);
		}
		universe.push(row.split(''));
	});
	universe = rotate90(universe);
	universe.map((row, r) => {
		if (!row.includes('#')) {
			exRows.push(r);
		}
	});

	const coords = [];
	universe.map((row, r) => {
		row.map((val, c) => {
			if (val === '#') {
				coords.push([r, c]);
			}
		});
	});

	let res = 0;
	for (let i = 0; i < coords.length - 1; i++) {
		for (let j = i + 1; j < coords.length; j++) {
			res += dist(coords[i], coords[j], EXPANSION - 1);
		}
	}
	console.log(res);
};
