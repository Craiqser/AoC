const diffs = (line) => {
	const springs = line.split(' ')[0];
	if (!springs.includes('?')) return 1;

	const masks = [], templates = [];
	masks.push(springs);

	while (masks.length) {
		const mask = masks.pop();
		const template1 = mask.replace('?', '#');
		const template2 = mask.replace('?', '.');
		if (template1.includes('?')) {
			masks.push(template1);
			masks.push(template2);
		} else {
			templates.push(template1);
			templates.push(template2);
		}
	}

	const groups = `${line.split(' ')[1]},`;
	return templates.reduce((acc, template) => {
		const damaged = template.split('.');
		const templateGroups = damaged.reduce((accGroups, curr) => {
			if (curr.length) {
				accGroups += `${curr.length},`;
			}
			return accGroups;
		}, '');
		if (templateGroups === groups) {
			acc++;
		}
		return acc;
	}, 0);
};

export const task = async () => {
	let lines = (await Bun.file('./2023/day12/assets/input.txt').text()).split('\n');
	let res = 0;
	lines.map((line) => res += diffs(line));
	console.log(res);
};
