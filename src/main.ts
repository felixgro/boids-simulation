import { initCanvas } from './utils/canvas';
import Flock from './Flock';

(() => {
	const ctx = initCanvas('.main-canvas');
	const flock = new Flock(150, ctx);

	flock.start();
})();
