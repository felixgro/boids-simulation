import { animate } from '@felixgro/animate-canvas';
import Controller from './Controller';

const flock = Controller.getInstance().flock;

const animation = animate('.main-canvas')
	.eachFrame(flock.render.bind(flock))
	.start();

document.onkeydown = () => animation.toggle();
window.onresize = () => animation.resizeCanvas();
