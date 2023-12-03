const isDigit = (char: string) => '0123456789'.includes(char);
const isSymbol = (char: string) => !isDigit(char) && char !== '.';

const findSymbol = (line: string, idxStart: number, idxEnd: number): boolean => {
	while (idxStart <= idxEnd) if (isSymbol(line[idxStart++])) return true;
	return false;
}

const checkSign = (lines: string[], lineNum: number, idxStart: number, idxEnd: number): boolean => {
	const searchFrom = Math.max(0, idxStart - 1);
	const searchTo = Math.min(idxEnd + 1, lines[lineNum].length - 1);
	if (isSymbol(lines[lineNum][searchFrom])) return true;
	if (isSymbol(lines[lineNum][searchTo])) return true;
	if ((lineNum > 0) && findSymbol(lines[lineNum - 1], searchFrom, searchTo)) return true;
	if ((lineNum < (lines.length - 1)) && findSymbol(lines[lineNum + 1], searchFrom, searchTo)) return true;
	return false;
};

export const task = async () => {
	const lines = (await Bun.file('./2023/day3/assets/test2.txt').text()).split('\n');
	let acc = 0;
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		for (let j = 0; j < line.length; j++) {
			if (isDigit(line[j])) {
				const idxStart = j; let idxEnd = j; let digit = '';
				while (j < line.length && isDigit(line[j])) {
					idxEnd = j;
					digit += line[j];
					j++;
				}
				acc += checkSign(lines, i, idxStart, idxEnd) ? parseInt(digit) : 0;
			}
		}
	}
	console.log(acc);
};
