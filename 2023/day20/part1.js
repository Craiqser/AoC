export const task = async () => {
	const modules = {};
	(await Bun.file('./2023/day20/assets/input.txt').text()).split('\n').map((line) => {
		const [src, list] = line.split(' -> ');
		modules[src.slice(1)] = { dst: list.split(', '), src: {}, type: src[0], val: false };
	});
	for (const [key, value] of Object.entries(modules)) {
		value.dst.map((name) => {
			if (modules[name] && modules[name].type === '&') {
				modules[name].src[key] = false;
			}
		});
	}

	let high = 0, low = 0;
	for (let i = 0; i < 1000; i++) {
		const queue = [['', 'roadcaster', false]];
		while (queue.length) {
			const [src, dst, sig] = queue.shift();
			sig ? high++ : low++;
			const module = modules[dst];
			if (!module) continue;

			if (module.type === '%' && !sig) {
				module.val = !module.val;
				module.dst.map((name) => {
					queue.push([dst, name, module.val])
				});
			} else if (module.type === '&') {
				module.src[src] = sig;
				let pulse = !Object.values(module.src).every((value) => value);
				module.dst.map((name) => queue.push([dst, name, pulse]));
			} else if (module.type === 'b') {
				module.dst.map((name) => queue.push([dst, name, sig]));
			}
		}
	}
	console.log(high * low);
}
