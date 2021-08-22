import Cell from './Cell';
import { StyledStage } from './styles/StyledStage';

interface PropTypes {
	stage: any[][];
}

const Stage: React.FC<PropTypes> = ({ stage }) => {
	return (
		<StyledStage width={stage[0].length} height={stage.length}>
			{stage.map((rows) => rows.map((cell, x) => <Cell key={x} type={cell[0]} />))}
		</StyledStage>
	);
};

export default Stage;
