export const task = async () => {
	let acc = 0;

	const lines = (await Bun.file('./2023/day2/assets/input.txt').text()).split('\n');
	lines.forEach((line) => {
		if (line.length > 0) {
			let game = line.split(':');
			const maxSubset = { red: 1, green: 1, blue: 1 };
			const subsets = game[1].split(';');

			for (let i = 0; i < subsets.length; i++) {
				const cubes = subsets[i].split(',');

				for (let j = 0; j < cubes.length; j++) {
					const countColor = cubes[j].trim().split(' ');
					const cubCount = parseInt(countColor[0]);
					const cubColor = countColor[1];
					if (cubCount > maxSubset[cubColor]) {
						maxSubset[cubColor] = cubCount;
					}
				}
			}
			acc += maxSubset.red * maxSubset.green * maxSubset.blue;
		}
	});
	console.log(acc);
};
