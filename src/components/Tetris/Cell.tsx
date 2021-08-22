import { memo } from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from 'utils/Tetris/tetrominos';

interface PropTypes {
	type: string | number;
}

const Cell: React.FC<PropTypes> = ({ type }) => {
	return <StyledCell type={type} color={TETROMINOS[type].color} />;
};

export default memo(Cell);
