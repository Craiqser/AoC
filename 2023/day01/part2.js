export const task = async () => {
	const numberWordsMap = {
		one: 'one1one',
		two: 'two2two',
		three: 'three3three',
		four: 'four4four',
		five: 'five5five',
		six: 'six6six',
		seven: 'seven7seven',
		eight: 'eight8eight',
		nine: 'nine9nine'
	};
	let acc = 0;
	const lines = (await Bun.file('./2023/day1/assets/input.txt').text()).split('\n');

	lines.forEach((line) => {
		if (line.length > 0) {
			Object.keys(numberWordsMap).forEach((key) => {
				line = line.replaceAll(key, numberWordsMap[key]);
			});
			line = line.split('').filter((char) => !Number.isNaN(Number.parseInt(char))).join();
			acc += parseInt(line[0] + line[line.length - 1]);
		}
	});

	console.log(acc);
};
