import { StyledDisplay } from './styles/StyledDisplay';

interface PropTypes {
	gameOver?: boolean;
	text: string;
}

const Display: React.FC<PropTypes> = ({ gameOver = false, text }) => {
	return <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>;
};

export default Display;
