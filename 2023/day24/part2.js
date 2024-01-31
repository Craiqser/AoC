export const task = async () => {
	const lines = (await Bun.file('./2023/day24/assets/input.txt').text()).split('\n');
	const hailstones = lines.map((line) => line.replace(' @ ', ', ').split(',').map(Number));
	const vX = {}, vY = {}, vZ = {}, res = {};

	const getRockVelocity = (velocities) => {
		let v = [];
		for (let i = -1000; i <= 1000; i++)
			v.push(i);

		Object.keys(velocities).forEach((velocity) => {
			if (velocities[velocity].length < 2) return;
			let vNew = [];
			v.forEach((possibleV) => {
				if ((velocities[velocity][0] - velocities[velocity][1]) % (possibleV - velocity) === 0)
					vNew.push(possibleV);
			});
			v = vNew;
		});
		return v[0];
	}

	for (let i = 0; i < hailstones.length; i++) {
		const h = hailstones[i];
		if (!vX[h[3]]) vX[h[3]] = [h[0]]; else vX[h[3]].push(h[0]);
		if (!vY[h[4]]) vY[h[4]] = [h[1]]; else vY[h[4]].push(h[1]);
		if (!vZ[h[5]]) vZ[h[5]] = [h[2]]; else vZ[h[5]].push(h[2]);
	}

	const rvx = getRockVelocity(vX);
	const rvy = getRockVelocity(vY);
	const rvz = getRockVelocity(vZ);

	for (let i = 0; i < hailstones.length; i++) {
		const stoneA = hailstones[i];
		for (let j = i + 1; j < hailstones.length; j++) {
			const stoneB = hailstones[j];
			const ma = (stoneA[4] - rvy) / (stoneA[3] - rvx);
			const mb = (stoneB[4] - rvy) / (stoneB[3] - rvx);
			const ca = stoneA[1] - (ma * stoneA[0]);
			const cb = stoneB[1] - (mb * stoneB[0]);
			const rpx = parseInt((cb - ca) / (ma - mb));
			const rpy = parseInt(ma * rpx + ca);
			const time = Math.round((rpx - stoneA[0]) / (stoneA[3] - rvx));
			const rpz = stoneA[2] + (stoneA[5] - rvz) * time;
			const result = rpx + rpy + rpz;

			if (!res[result]) res[result] = 1; else res[result]++;
		}
	}
	console.log(Object.keys(res).sort((a, b) => res[b] - res[a])[0]);
}
