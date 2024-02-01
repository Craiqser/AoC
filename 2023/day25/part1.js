import { find } from './find';

export const task = async () => {
	const edges = [], ids = new Map();
	(await Bun.file('./2023/day25/assets/input.txt').text()).split('\n').map((line) => {
		const [src, dests] = line.split(': ');
		if (!ids.has(src)) {
			ids.set(src, ids.size);
		}
		for (const dest of dests.split(' ')) {
			if (!ids.has(dest)) {
				ids.set(dest, ids.size);
			}
			edges.push([ids.get(src), ids.get(dest)]);
		}
	});
	while (true) {
		const groups = find(ids.size, edges, 3);
		if (groups !== null) {
			const count = groups.filter(x => x === groups[0]).length;
			console.log(count * (ids.size - count));
			break;
		}
	}
}
