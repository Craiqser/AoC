export const task = async () => {
	const lines = (await Bun.file('./2023/day22/assets/test1.txt').text()).split('\n');
	const bricks = lines.map((line) => line.replace('~', ',').split(',').map(Number));
	const overlap = (a, b) => Math.max(a[0], b[0]) <= Math.min(a[3], b[3]) && Math.max(a[1], b[1]) <= Math.min(a[4], b[4]);

	bricks.sort((a, b) => a[2] - b[2]);
	for (let i = 0; i < bricks.length; i++) {
		let zMax = 1;
		for (let j = 0; j < i; j++) {
			if (overlap(bricks[i], bricks[j])) {
				zMax = Math.max(zMax, bricks[j][5] + 1);
			}
		}
		bricks[i][5] -= bricks[i][2] - zMax;
		bricks[i][2] = zMax;
	}

	const parentChilds = new Array(bricks.length).fill(null).map(() => new Array());
	const childParents = new Array(bricks.length).fill(null).map(() => new Array());

	bricks.sort((a, b) => a[2] - b[2]);
	for (let i = 0; i < bricks.length; i++) {
		for (let j = 0; j < i; j++) {
			if (overlap(bricks[j], bricks[i]) && bricks[i][2] === bricks[j][5] + 1) {
				parentChilds[j].push(i);
				childParents[i].push(j);
			}
		}
	}
	let res = 0;
	parentChilds.forEach((bricks) => bricks.every((idx) => childParents[idx].length > 1) ? res++ : null);
	console.log(res);
}
