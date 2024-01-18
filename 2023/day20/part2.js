const gcd = (a, b) => b == 0 ? a : gcd(b, a % b);
const lcm = (a, b) => a * b / gcd(a, b);

export const task = async () => {
	const modules = {};
	let rxParentName = '', pressed = 0;
	(await Bun.file('./2023/day20/assets/input.txt').text()).split('\n').map((line) => {
		const [src, list] = line.split(' -> ');
		modules[src.slice(1)] = { dst: list.split(', '), src: {}, type: src[0], val: false };
	});
	for (const [key, value] of Object.entries(modules)) {
		value.dst.map((name) => {
			if (name === 'rx') {
				rxParentName = key;
				modules[rxParentName].pressed = {};
			}
			if (modules[name] && modules[name].type === '&') {
				modules[name].src[key] = false;
				if (name === rxParentName) {
					modules[name].pressed[key] = 0;
				}
			}
		});
	}

	while (true) {
		pressed++;
		const queue = [['', 'roadcaster', false]];

		while (queue.length) {
			const [src, dst, sig] = queue.shift();
			const module = modules[dst];
			if (!module) continue;

			if (module.type === '%' && !sig) {
				module.val = !module.val;
				module.dst.map((name) => queue.push([dst, name, module.val]));
			} else if (module.type === '&') {
				module.src[src] = sig;
				let pulse = !Object.values(module.src).every((value) => value);
				module.dst.map((name) => queue.push([dst, name, pulse]));

				if (dst === rxParentName) {
					module.pressed[src] = pressed;
				}
			} else if (module.type === 'b') {
				module.dst.map((name) => queue.push([dst, name, sig]));
			}
		}

		if (Object.values(modules[rxParentName].src).every(value => value)) {
			console.log(modules[rxParentName]);

			let res = 1;
			for (let cnt of Object.values(modules[rxParentName].pressed)) {
				res = lcm(res, cnt);
			}
			console.log(res);
			break;
		}
	}
}
