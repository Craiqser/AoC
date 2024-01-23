export const task = async () => {
	const lines = (await Bun.file('./2023/day23/assets/test1.txt').text()).split('\n');
	console.log(lines);
}
// 94 (другие возможные маршруты состояли из 90, 86, 82, 82 и 74 шагов).
