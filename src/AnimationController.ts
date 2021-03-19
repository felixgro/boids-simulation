export default class AnimationController {
	public animationId: number = 0;
	public fps: number = 0;

	public lastCall: DOMHighResTimeStamp = 0;

	constructor(
		public ctx: CanvasRenderingContext2D,
		public callback: Function
	) {}

	public start() {
		this.requestNewFrame();
	}

	public stop() {
		window.cancelAnimationFrame(this.animationId);
	}

	public requestNewFrame() {
		if (!this.lastCall) this.lastCall = performance.now();
		this.animationId = requestAnimationFrame(this.loop.bind(this));
	}

	public loop() {
		const current: DOMHighResTimeStamp = performance.now();
		const elapsed: DOMHighResTimeStamp = current - this.lastCall;
		this.fps = 60 / ((elapsed / 1000) * 60);

		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		this.callback(this.ctx);

		this.lastCall = current;
		this.requestNewFrame();
	}
}
