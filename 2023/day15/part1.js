const hash = (str) => str.split('').map((char) => char.charCodeAt(0)).reduce((acc, code) => (acc + code) * 17 % 256, 0);

export const task = async () => {
	const sequences = (await Bun.file('./2023/day15/assets/input.txt').text()).split(',');
	let res = 0;
	sequences.forEach((s) => res += hash(s));
	console.log(res);
};
