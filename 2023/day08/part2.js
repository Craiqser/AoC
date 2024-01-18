const gcd = (a, b) => b == 0 ? a : gcd(b, a % b);
const lcm = (a, b) => a / gcd(a, b) * b;
const lcmArr = (ns) => ns.reduce(lcm, 1);

export const task = async () => {
	const lines = (await Bun.file('./2023/day8/assets/input.txt').text()).split('\n');
	const dirs = lines[0].split('');
	const map = {}, nodes = [], steps = [];
	for (let i = 2; i < lines.length; i++) {
		const parts = lines[i].split(' = (');
		if (parts[0][2] === 'A') nodes.push(parts[0]);
		map[parts[0]] = parts[1].slice(0, 8).split(', ');
	}
	nodes.forEach((node) => {
		let step = 0;
		while (true) {
			const idx = (dirs[step++ % dirs.length] === 'L') ? 0 : 1;
			node = map[node][idx];
			if (node[2] === 'Z') {
				steps.push(step);
				break;
			}
		}
	});
	console.log(lcmArr(steps));
};
