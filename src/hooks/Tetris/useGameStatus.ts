import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';

const linePoints = [40, 100, 300, 1200];

type useGameStatusReturnType = [
	number,
	Dispatch<SetStateAction<number>>,
	number,
	Dispatch<SetStateAction<number>>,
	number,
	Dispatch<SetStateAction<number>>,
	boolean,
	Dispatch<SetStateAction<boolean>>
];

export const useGameStatus = (rowsCleared: number): useGameStatusReturnType => {
	const [score, setScore] = useState(0);
	const [rows, setRows] = useState(0);
	const [level, setLevel] = useState(0);
	const [isPause, setIsPause] = useState(false);

	const calcScore = useCallback(() => {
		// We have score
		if (rowsCleared > 0) {
			// This is how original Tetris score is calculated
			setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1));
			setRows((prev) => prev + rowsCleared);
		}
	}, [level, rowsCleared]);

	useEffect(() => {
		calcScore();
	}, [calcScore, rowsCleared, score]);

	return [score, setScore, rows, setRows, level, setLevel, isPause, setIsPause];
};
