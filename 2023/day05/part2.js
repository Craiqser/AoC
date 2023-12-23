const processRange = (range, converter) => {
	const convRanges = [];
	converter.forEach(([dst, src, len]) => {
		if (range[0] < (src + len) && (range[0] + range[1]) > src) {
			const diffBeg = Math.max(range[0], src);
			const diffEnd = Math.min(range[0] + range[1], src + len - 1);
			convRanges.push([diffBeg - src + dst, diffEnd - diffBeg]);
		}
	})
	return convRanges.length > 0 ? convRanges : [[range[0], range[1]]];
}

export const task = async () => {
	const lines = (await Bun.file('./2023/day5/assets/input.txt').text()).split('\n');
	const seeds = lines[0].split(':')[1].trim().split(' ').map(Number);
	const converters = new Map();
	let groupNum = 0, minLocation = Infinity;

	for (let i = 2; i < lines.length; i++) {
		const line = lines[i];
		if (line.length === 0) continue;
		if (line.includes(' map:')) {
			groupNum++;
		} else {
			const converter = converters.get(groupNum) ?? [];
			converter.push(line.split(' ').map(Number));
			converters.set(groupNum, converter);
		}
	}
	for (let i = 0; i < seeds.length; i += 2) {
		let ranges = [[seeds[i], seeds[i + 1]]];
		for (let j = 1; j <= groupNum; j++) {
			const converter = converters.get(j);
			const nextRanges = [];
			ranges.forEach((range) => {
				processRange(range, converter).forEach((convRanges) => {
					nextRanges.push(convRanges);
				});
			});
			ranges = nextRanges;
		}
		ranges.forEach((range) => {
			if (range[0] < minLocation) minLocation = range[0];
		});
	}
	console.log(minLocation);
};
