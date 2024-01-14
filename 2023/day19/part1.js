export const task = async () => {
	const data = (await Bun.file('./2023/day19/assets/input.txt').text()).split('\n\n');
	const wf = data[0].split('\n');
	const workflows = {};
	wf.map((workflow) => {
		const idx = workflow.indexOf('{');
		const steps = workflow.slice(idx + 1, -1).split(',').map((step) => {
			if (step.includes(':')) {
				const act = step.split(':');
				const func = act[0].includes('<')
					? (part) => part[act[0].split('<')[0]] < act[0].split('<')[1] ? act[1] : ''
					: (part) => part[act[0].split('>')[0]] > act[0].split('>')[1] ? act[1] : '';
				return func;
			} else return (_) => step;
		});
		workflows[workflow.slice(0, idx)] = steps;
	});

	const parts = data[1].split('\n').map((part) =>
		part.slice(1, -1).split(',').reduce((acc, category) => {
			const val = category.split('=');
			acc[val[0]] = parseInt(val[1]);
			return acc;
		}, {}));

	const process = (part, step) => {
		if (step === 'R') return 0;
		if (step === 'A') return Object.values(part).reduce((acc, val) => acc += val, 0);
		for (let i = 0; i < workflows[step].length; i++) {
			if (workflows[step][i](part).length) {
				return process(part, workflows[step][i](part));
			}
		}
	};
	console.log(parts.reduce((acc, part) => acc += process(part, 'in'), 0));
}
