import { useCallback, useState } from 'react';
import { checkCollision, STAGE_WIDTH } from 'utils/Tetris/gameHelpers';
import { randomTetromino, TETROMINOS } from 'utils/Tetris/tetrominos';

export interface IPlayer {
	pos: {
		x: number;
		y: number;
	};
	tetromino: (string | number)[][];
	collied: boolean;
}

interface IUpdatePlayer {
	x: number;
	y: number;
	collied?: boolean;
}

type usePlayerReturnType = [
	IPlayer,
	({ x, y, collied }: IUpdatePlayer) => void,
	() => void,
	(stage: any[][], dir: number) => void
];

export const usePlayer = (): usePlayerReturnType => {
	const [player, setPlayer] = useState<IPlayer>({
		pos: { x: 0, y: 0 },
		tetromino: TETROMINOS[0].shape,
		collied: false
	});

	const rotate = (matrix: any[][], dir: number) => {
		// Make the rows to become cols (transpose)
		const rotatedTetro = matrix.map((_, index) => matrix.map((col) => col[index]));

		// Reverse each row to get a rotated matrix
		if (dir > 0) return rotatedTetro.map((row) => row.reverse());

		return rotatedTetro.reverse();
	};

	const playerRotate = (stage: any[][], dir: number) => {
		const clonedPlayer: IPlayer = JSON.parse(JSON.stringify(player));

		clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

		const pos = clonedPlayer.pos.x;

		let offset = 1;

		while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
			clonedPlayer.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));

			if (offset > clonedPlayer.tetromino[0].length) {
				rotate(clonedPlayer.tetromino, -dir);
				clonedPlayer.pos.x = pos;
				return;
			}
		}

		setPlayer(clonedPlayer);
	};

	const updatePlayerPos = ({ x, y, collied = false }: IUpdatePlayer) => {
		setPlayer((prev) => ({
			...prev,
			pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
			collied
		}));
	};

	const resetPlayer = useCallback(() => {
		setPlayer({
			pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
			tetromino: randomTetromino().shape,
			collied: false
		});
	}, []);

	return [player, updatePlayerPos, resetPlayer, playerRotate];
};
