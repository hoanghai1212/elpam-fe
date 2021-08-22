import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { createStage } from 'utils/Tetris/gameHelpers';
import { IPlayer } from './usePlayer';

type useStageReturnType = [any[][], Dispatch<SetStateAction<any[][]>>, number];

export const useStage = (player: IPlayer, resetPlayer: () => void): useStageReturnType => {
	const [stage, setStage] = useState(createStage());
	const [rowsCleared, setRowsCleared] = useState(0);

	useEffect(() => {
		setRowsCleared(0);

		const sweepRows = (newStage: any[][]) =>
			newStage.reduce((acc, row) => {
				if (row.findIndex((cell) => cell[0] === 0) === -1) {
					setRowsCleared((prev) => prev + 1);
					acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
					return acc;
				}

				acc.push(row);
				return acc;
			}, []);

		const updateStage = (prevStage: any[][]) => {
			// First flush the stage
			const newStage = prevStage.map((row) =>
				row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
			);

			// Then draw the tetromino
			player.tetromino.forEach((row, y) => {
				row.forEach((value, x) => {
					if (value !== 0) {
						newStage[y + player.pos.y][x + player.pos.x] = [
							value,
							`${player.collied ? 'merged' : 'clear'}`
						];
					}
				});
			});

			// Check if we collied
			if (player.collied) {
				resetPlayer();
				return sweepRows(newStage);
			}

			return newStage;
		};

		setStage((prev) => updateStage(prev));
	}, [player]);

	return [stage, setStage, rowsCleared];
};
