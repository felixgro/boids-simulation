export const initCanvas = (): CanvasRenderingContext2D => {
	const canvas = <HTMLCanvasElement>document.querySelector('.main-canvas');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	window.onresize = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	};

	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Cannot get CanvasRenderingContext2D');

	return ctx;
};
