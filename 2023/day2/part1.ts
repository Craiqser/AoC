export const task = async () => {
	const limits = { red: 12, green: 13, blue: 14 };
	let acc = 0;
	let isFail = false;

	const lines = (await Bun.file('./2023/day3/assets/test1.txt').text()).split('\n');
	lines.forEach((line) => {
		if (line.length > 0) {
			let game = line.split(':');
			const gameNum = parseInt(game[0].split(' ')[1]);
			const subsets = game[1].split(';');

			for (let i = 0; !isFail || (i < subsets.length); i++) {
				const cubes = subsets[i].split(',');

				for (let j = 0; j < cubes.length; j++) {
					const countColor = cubes[j].trim().split(' ');
					const cubCount = parseInt(countColor[0]);
					const cubColor = countColor[1];
					if (cubCount > limits[cubColor]) {
						isFail = true;
						break;
					}
				}
			}
			acc += isFail ? 0 : gameNum;
			isFail = false;
		}
	});
	console.log(acc);
};
