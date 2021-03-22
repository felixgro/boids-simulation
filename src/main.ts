import AnimationController from './AnimationController';
import Flock from './Boids/Flock';

import { initCanvas } from './utils/canvas';

const flock = Flock.getInstance();

new AnimationController(initCanvas(), (ctx: CanvasRenderingContext2D) => {
	flock.render(ctx);
}).start();
