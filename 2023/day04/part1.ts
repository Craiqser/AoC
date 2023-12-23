export const task = async () => {
	const lines = (await Bun.file('./2023/day4/assets/input.txt').text()).split('\n');
	let acc = 0;

	for (const line of lines) {
		const numbers = line.split(':')[1].split('|');
		const wins = numbers[0].split(' ').map(Number).filter((num) => num > 0);
		const haves = numbers[1].split(' ').map(Number).filter((num) => num > 0);
		const matches = [];

		for (const have of haves) {
			if (wins.includes(have)) {
				matches.push(have);
			}
		}

		if (matches.length > 0) acc += 2**(matches.length - 1);
	}
	console.log(acc);
};
