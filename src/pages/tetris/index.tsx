import dynamic from 'next/dynamic';

const Tetris = dynamic(import('components/Tetris'));

const Index = () => {
	return <Tetris />;
};

export default Index;
