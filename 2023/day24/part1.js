export const task = async () => {
	const lines = (await Bun.file('./2023/day24/assets/input.txt').text()).split('\n');
	const hailstones = lines.map((line) => line.replace('@', ',').split(',').map(Number));
	const boundMin = 200000000000000, boundMax = 400000000000000;
	let res = 0;
	for (let i = 0; i < hailstones.length; i++) {
		const h1 = hailstones[i];
		for (let j = 0; j < i; j++) {
			const h2 = hailstones[j];
			const [a1, b1, c1] = [h1[4], -h1[3], h1[4] * h1[0] - h1[3] * h1[1]];
			const [a2, b2, c2] = [h2[4], -h2[3], h2[4] * h2[0] - h2[3] * h2[1]];
			const [d, e] = [a1 * b2, a2 * b1];
			if (d === e) continue;

			const x = (c1 * b2 - c2 * b1) / (d - e);
			const y = (c2 * a1 - c1 * a2) / (d - e);
			if (x >= boundMin && x <= boundMax && y >= boundMin && y <= boundMax) {
				if ((x - h1[0]) * h1[3] >= 0 && (y - h1[1]) * h1[4] >= 0
					&& (x - h2[0]) * h2[3] >= 0 && (y - h2[1]) * h2[4] >= 0) res++;
			}
		}
	}
	console.log(res);
}
