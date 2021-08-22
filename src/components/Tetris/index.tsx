// Reactjs
import { KeyboardEventHandler, useState } from 'react';

// Nextjs
import dynamic from 'next/dynamic';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Helpers
import { checkCollision, createStage } from 'utils/Tetris/gameHelpers';

// Custom Hooks
import { usePlayer } from 'hooks/Tetris/usePlayer';
import { useStage } from 'hooks/Tetris/useStage';
import { useInterval } from 'hooks/Tetris/useInterval';
import { useGameStatus } from 'hooks/Tetris/useGameStatus';

// Components
const Stage = dynamic(import('./Stage'));
const Display = dynamic(import('./Display'));
const Button = dynamic(import('./Button'));

const Tetris = () => {
	const [droptime, setDroptime] = useState<number | null>(null);
	const [gameOver, setGameOver] = useState(false);

	const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
	const [score, setScore, rows, setRows, level, setLevel, isPause, setIsPause] =
		useGameStatus(rowsCleared);

	const movePlayer = (dir: number) => {
		if (!checkCollision(player, stage, { x: dir, y: 0 })) updatePlayerPos({ x: dir, y: 0 });
	};

	const startGame = () => {
		// Reset everything
		setStage(createStage());
		setDroptime(800);
		resetPlayer();
		setGameOver(false);
		setScore(0);
		setRows(0);
		setLevel(0);
	};

	const pauseGame = () => {
		setIsPause(true);
		setDroptime(null);
	};

	const resumeGame = () => {
		setIsPause(false);
		setDroptime(600 / (level + 1) + 200);
	};

	const endGame = () => {
		setIsPause(false);
		setGameOver(true);
		setDroptime(null);
	};

	const drop = () => {
		// Increase level when player has cleared 10 rows
		if (rows > (level + 1) * 10) {
			setLevel((prev) => prev + 1);
			// Also increase speed
			setDroptime(600 / (level + 1) + 200);
		}

		if (!checkCollision(player, stage, { x: 0, y: 1 })) {
			updatePlayerPos({ x: 0, y: 1, collied: false });
		} else {
			// Game Over
			if (player.pos.y < 1) {
				setGameOver(true);
				setDroptime(null);
			}

			updatePlayerPos({ x: 0, y: 0, collied: true });
		}
	};

	const keyUp: KeyboardEventHandler<HTMLDivElement> = ({ key }) => {
		if (!gameOver && key === 'ArrowDown') {
			setDroptime(600 / (level + 1) + 200);
		}
	};

	const dropTetro = () => {
		setDroptime(null);
		drop();
	};

	const move: KeyboardEventHandler<HTMLDivElement> = ({ key }) => {
		if (!gameOver) {
			switch (key) {
				case 'ArrowLeft':
					movePlayer(-1);
					break;

				case 'ArrowRight':
					movePlayer(1);
					break;

				case 'ArrowDown':
					dropTetro();
					break;

				case 'ArrowUp':
					playerRotate(stage, 1);
					break;

				default:
					break;
			}
		}
	};

	useInterval(() => {
		drop();
	}, droptime);

	return (
		<StyledTetrisWrapper role="button" tabIndex={0} onKeyDown={move} onKeyUp={keyUp}>
			<StyledTetris>
				<Stage stage={stage} />
				<aside>
					{gameOver ? (
						<Display gameOver={gameOver} text="Game Over" />
					) : (
						<div>
							<Display text={`Score: ${score}`} />
							<Display text={`Rows: ${rows}`} />
							<Display text={`Level: ${level}`} />
						</div>
					)}
					{!droptime && !isPause && <Button callback={startGame} text="Start Game" />}
					{droptime !== null && <Button callback={pauseGame} text="Pause Game" />}
					{isPause && <Button callback={resumeGame} text="Resume Game" />}
					{(droptime !== null || isPause) && <Button callback={endGame} text="End Game" />}
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	);
};

export default Tetris;
