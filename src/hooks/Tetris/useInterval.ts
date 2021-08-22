import { MutableRefObject, useEffect, useRef } from 'react';

export const useInterval = (callback: () => any, delay: number | null) => {
	const savedCallback = useRef() as MutableRefObject<any>;

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
};