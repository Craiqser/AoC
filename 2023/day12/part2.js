const diffs = (line) => {
	const springs = `${(line.split(' ')[0] + '?').repeat(5)}`;
	const groups = `0,${(line.split(' ')[1] + ',').repeat(4)}${line.split(' ')[1]}`.split(',').map(Number);
	const sgCache = [];

	for (let i = 0; i < springs.length; i++) {
		sgCache[i] = [];
	}

	const getCount = (s, g) => {
		if (s === -1 && g === 0) return 1;
		return sgCache[s]?.[g] ?? 0;
	};

	for (let g = 0; g < groups.length; g++) {
		for (let s = 0; s < springs.length; s++) {
			let currCount = 0;

			if (springs[s] !== '#') {
				currCount += getCount(s - 1, g);
			}

			if (g > 0) {
				let doCount = true;

				for (let k = 1; k <= groups[g]; k++) {
					if (springs[s - k] === '.') {
						doCount = false;
					}
				}

				if (!doCount || springs[s] === '#') {
					doCount = false;
				}

				if (doCount) {
					currCount += getCount(s - groups[g] - 1, g - 1);
				}
			}
			sgCache[s][g] = currCount;
		}
	}
	return sgCache[springs.length - 1][groups.length - 1];
};

export const task = async () => {
	const lines = (await Bun.file('./2023/day12/assets/input.txt').text()).split('\n');
	let res = 0;
	lines.map((line) => res += diffs(line));
	console.log(res);
};
