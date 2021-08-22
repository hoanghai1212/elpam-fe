import { MouseEventHandler } from 'react';
import { StyledButton } from './styles/StyledButton';

interface PropTypes {
	callback: MouseEventHandler<HTMLButtonElement>;
	text: string;
}

const StartButton: React.FC<PropTypes> = ({ callback, text }) => {
	return <StyledButton onClick={callback}>{text}</StyledButton>;
};

export default StartButton;
