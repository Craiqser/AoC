export const task = async () => {
	const data = (await Bun.file('./2023/day19/assets/input.txt').text()).split('\n\n');
	const wf = data[0].split('\n');
	const workflows = {};
	wf.map((workflow) => {
		const idx = workflow.indexOf('{');
		const steps = workflow.slice(idx + 1, -1).split(',').map((step) => {
			if (step.includes(':')) {
				const act = step.split(':');
				let op = '>';
				let cat = act[0].split('>')[0];
				let val = act[0].split('>')[1];
				if (act[0].includes('<')) {
					op = '<';
					cat = act[0].split('<')[0];
					val = act[0].split('<')[1];
				}
				return { cat, op, val: parseInt(val), res: act[1] };
			} else
				return { res: step };
		});
		workflows[workflow.slice(0, idx)] = steps;
	});

	const queue = [{ wfName: 'in', x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] }];
	let res = 0;
	while (queue.length) {
		const part = queue.shift();
		if (part.wfName === 'R') continue;
		if (part.wfName === 'A') {
			res += (part.x[1] - part.x[0] + 1)
				* (part.m[1] - part.m[0] + 1)
				* (part.a[1] - part.a[0] + 1)
				* (part.s[1] - part.s[0] + 1);
			continue;
		}
		workflows[part.wfName].forEach((step) => {
			const nextPart = structuredClone(part);
			nextPart.wfName = step.res;
			if (!step.op) {
				queue.push(nextPart);
			} else {
				if (step.op === '<') {
					nextPart[step.cat][1] = Math.min(nextPart[step.cat][1], step.val - 1);
					queue.push(nextPart);
					part[step.cat][0] = Math.max(part[step.cat][0], nextPart[step.cat][1] + 1);
				}
				else {
					nextPart[step.cat][0] = Math.max(nextPart[step.cat][0], step.val + 1);
					queue.push(nextPart);
					part[step.cat][1] = Math.min(part[step.cat][1], nextPart[step.cat][0] - 1);
				}
			}
		});
	}
	console.log(res);
}
