const calcWays = (time: number, record: number) => {
	let res = 0;
	for (let speed = 1; speed < time; speed++) {
		res += speed * (time - speed) > record ? 1 : 0;
	}
	return res;
};

export const task = async () => {
	const lines = (await Bun.file('./2023/day6/assets/input.txt').text()).split('\n');
	const times = lines[0].split(':')[1].split(' ').filter((s) => s.length).map(Number);
	const records = lines[1].split(':')[1].split(' ').filter((s) => s.length).map(Number);
	console.log(times.reduce((acc, time, idx) => acc *= calcWays(time, records[idx]), 1));
};
