let digits: string[];
const isDigit = (char: string) => '0123456789'.includes(char);

const checkLine = (line: string, j: number) => {
	let idxStart = -1, idxEnd = -1, digit = '';
	if (isDigit(line[j - 1])) {
		for (let k = j - 1; (k >= 0) && isDigit(line[k]); k--) idxStart = k;
		if (idxStart > -1) {
			for (let k = idxStart; (k < line.length) && isDigit(line[k]); k++) {
				digit = digit + line[k];
				idxEnd = k;
			}
			if (digit) digits.push(digit);
		}
	}
	if (idxEnd >= j) return;
	idxStart = -1;
	if (isDigit(line[j + 1])) {
		for (let k = j + 1; (k >= 0) && isDigit(line[k]); k--) idxStart = k;
		if (idxStart > -1) {
			digit = '';
			for (let k = idxStart; (k < line.length) && isDigit(line[k]); k++) digit = digit + line[k];
			if (digit) digits.push(digit);
		}
	} else if (isDigit(line[j])) {
		digit = '';
		for (let k = j; (k < line.length) && isDigit(line[k]); k++) digit = digit + line[k];
		if (digit) digits.push(digit);
	}
};

const findNumbers = (lines: string[], i: number, j: number): number => {
	digits = [];
	let res = 0;
	let digit = '';
	for (let k = j - 1; (k >= 0) && isDigit(lines[i][k]); k--) digit = lines[i][k] + digit;
	if (digit) digits.push(digit);

	digit = '';
	for (let k = j + 1; (k < lines[i].length) && isDigit(lines[i][k]); k++) digit = digit + lines[i][k];
	if (digit) digits.push(digit);

	if (i > 0) checkLine(lines[i - 1], j);
	if (i < lines.length - 1) checkLine(lines[i + 1], j);

	if (digits.length === 2) res = parseInt(digits[0]) * parseInt(digits[1]);
	return res;
};

export const task = async () => {
	const lines = (await Bun.file('./2023/day3/assets/input.txt').text()).split('\n');
	let acc = 0;
	for (let i = 0; i < lines.length; i++) {
		for (let j = 0; j < lines[i].length; j++) {
			if (lines[i][j] === '*') acc += findNumbers(lines, i, j);
		}
	}
	console.log(acc);
};
