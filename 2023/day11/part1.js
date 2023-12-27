const expand = (arr) => {
	const res = [];
	arr.map((line) => {
		res.push(line);
		if (!line.includes('#'))
			res.push(line);
	});
	return res;
};

export const rotate90 = (arr) => {
	const res = [];
	arr.map((row, r) => row.map((val, c) => {
		if (!res[c])
			res[c] = [];
		res[c][arr.length - r - 1] = val;
	}));
	return res;
};

export const task = async () => {
	let lines = (await Bun.file('./2023/day11/assets/input.txt').text()).split('\n');
	let universe = [];
	lines.map((line) => universe.push(line.split('')));
	universe = expand(rotate90(expand(universe)));
	const coords = [];
	universe.map((row, r) => row.map((val, c) => {
		if (val === '#')
			coords.push([r, c]);
	}));
	let res = 0;
	for (let i = 0; i < coords.length - 1; i++)
		for (let j = i + 1; j < coords.length; j++)
			res += Math.abs(coords[i][0] - coords[j][0]) + Math.abs(coords[i][1] - coords[j][1]);
	console.log(res);
};
