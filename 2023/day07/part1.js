export const task = async () => {
	const weights = '__________23456789TJQKA', players = [];
	const lines = (await Bun.file('./2023/day7/assets/input.txt').text()).split('\n');
	lines.map((line) => {
		const codes = [];
		const cards = line.split(' ')[0];
		const counts = cards.split('').reduce((acc, card) => {
			codes.push(weights.indexOf(card));
			acc.hasOwnProperty(card) ? acc[card] += 1 : acc[card] = 1;
			return acc;
		}, {});
		let score = 0;
		Object.keys(counts).map((key) => score += 10**counts[key]);
		players.push([score, codes.join(''), parseInt(line.split(' ')[1])]);
	});
	let res = 0;
	players.sort((a, b) => {
		if (a[0] === b[0]) return a[1] - b[1];
		return a[0] - b[0];
	}).map((v, i) => res += v[2] * (i + 1));
	console.log(res);
};
