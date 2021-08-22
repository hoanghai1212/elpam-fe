import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background: url('/Tetris/bg.png') #000;
	background-size: cover;
	overflow: hidden;
`;

export const StyledTetris = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	padding: 40px;
	margin: auto;
	max-width: 900px;

	aside {
		width: 100%;
		max-width: 230px;
		display: block;
		padding: 0 20px;
	}
`;
