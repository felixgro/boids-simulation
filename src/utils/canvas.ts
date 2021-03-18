export const initCanvas = (
	selector: string
): CanvasRenderingContext2D | null => {
	const canvas = <HTMLCanvasElement>document.querySelector(selector);

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	return canvas.getContext('2d');
};
