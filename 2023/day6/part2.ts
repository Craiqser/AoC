export const task = async () => {
	const lines = (await Bun.file('./2023/day6/assets/input.txt').text()).split('\n');
	const time = parseInt(lines[0].split(':')[1].split(' ').filter((s) => s.length).join(''));
	const record = parseInt(lines[1].split(':')[1].split(' ').filter((s) => s.length).join(''));
	let res = 0;
	for (let speed = 1; speed < time; speed++) {
		res += speed * (time - speed) > record ? 1 : 0;
	}
	console.log(res);
};
