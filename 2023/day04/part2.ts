export const task = async () => {
	const lines = (await Bun.file('./2023/day4/assets/input.txt').text()).split('\n');
	const cards: Map<number, number> = new Map();
	let acc = 0, cardNum = 0;

	for (const line of lines) {
		cardNum++;
		const numbers = line.split(':')[1].split('|');
		const wins = numbers[0].split(' ').map(Number).filter((num) => num > 0);
		const haves = numbers[1].split(' ').map(Number).filter((num) => num > 0);
		let matches = 0;

		for (const have of haves)
			if (wins.includes(have)) matches++;

		const cardCopies = cards.get(cardNum) ?? 0; // Get copies of current card.
		cards.set(cardNum, (cards.get(cardNum) ?? 0) + 1); // Store original card.

		for (let i = 1; i <= matches; i++)
			cards.set(cardNum + i, (cards.get(cardNum + i) ?? 0) + cardCopies + 1);
	}
	cards.forEach((value) => acc += value);
	console.log(acc);
};
