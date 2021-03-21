import AnimationController from './AnimationController';
import Flock from './Boids/Flock';

import { initCanvas } from './utils/canvas';

import Tweakpane from 'tweakpane';

const pane = new Tweakpane({ title: 'Parameters' });

const flock = new Flock(200, 1, pane);

new AnimationController(initCanvas(), (ctx: CanvasRenderingContext2D) => {
	flock.render(ctx);
}).start();
