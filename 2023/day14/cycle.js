export const cycle = (map, xMax, yMax) => {
	for (let x = 0; x < xMax; x++) {
		let posY = 0;
		for (let y = posY; y < yMax; y++) {
			if (map[y][x] === '#') posY = y + 1;
			if (map[y][x] === 'O') {
				map[y][x] = '.';
				map[posY++][x] = 'O';
			}
		}
	}
	for (let y = 0; y < yMax; y++) {
		let posX = 0;
		for (let x = posX; x < xMax; x++) {
			if (map[y][x] === '#') posX = x + 1;
			if (map[y][x] === 'O') {
				map[y][x] = '.';
				map[y][posX++] = 'O';
			}
		}
	}
	for (let x = 0; x < xMax; x++) {
		let posY = yMax - 1;
		for (let y = posY; y > -1; y--) {
			if (map[y][x] === '#') posY = y - 1;
			if (map[y][x] === 'O') {
				map[y][x] = '.';
				map[posY--][x] = 'O';
			}
		}
	}
	for (let y = 0; y < yMax; y++) {
		let posX = xMax - 1;
		for (let x = posX; x > -1; x--) {
			if (map[y][x] === '#') posX = x - 1;
			if (map[y][x] === 'O') {
				map[y][x] = '.';
				map[y][posX--] = 'O';
			}
		}
	}
	return JSON.stringify(map);
};
