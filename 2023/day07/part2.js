export const task = async () => {
	const weights = '__________J23456789TQKA', players = [];
	const lines = (await Bun.file('./2023/day7/assets/input.txt').text()).split('\n');
	lines.map((line) => {
		const codes = [];
		const cards = line.split(' ')[0];
		let counterJ = 0, maxKey = '', maxValue = 0;
		const counts = cards.split('').reduce((acc, card) => {
			codes.push(weights.indexOf(card));
			card === 'J' ? counterJ++ : acc.hasOwnProperty(card) ? acc[card] += 1 : acc[card] = 1;
			return acc;
		}, {});
		if (counterJ > 0) {
			for (const [key, value] of Object.entries(counts))
				if (value > maxValue) {
					maxKey = key; maxValue = value;
				}
			counts[maxKey] = maxValue + counterJ;
		}
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
