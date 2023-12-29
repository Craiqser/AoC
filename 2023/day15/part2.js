const hash = (str) => str.split('').map((char) => char.charCodeAt(0)).reduce((acc, code) => (acc + code) * 17 % 256, 0);

export const task = async () => {
	const sequences = (await Bun.file('./2023/day15/assets/input.txt').text()).split(',');
	const boxes = new Array(256).fill('').map(() => []);
	sequences.forEach((seq) => {
		if (seq.endsWith('-')) {
			const label = seq.split('-')[0];
			const box = hash(label);
			boxes[box] = boxes[box].filter((lens) => lens.label !== label);
		} else {
			const [label, focal] = seq.split('=');
			const box = hash(label);
			const idx = boxes[box].findIndex((lens) => lens.label === label);
			if (idx === -1) {
				boxes[box].push({ label, focal });
			} else {
				boxes[box][idx].focal = focal;
			}
		}
	});
	const res = boxes.map((box, idx) => box
		.map((lens, lidx) => (1 + idx) * (1 + lidx) * Number(lens.focal))
		.reduce((acc, power) => acc + power, 0)
	);
	console.log(res.reduce((acc, power) => acc + power, 0));
};
