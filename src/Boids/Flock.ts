import Tweakpane from 'tweakpane';
import Birdoid from './Birdoid';

import Boid from './Boid';
import Enemy from './Enemy';

export default class Flock {
	public boids: Birdoid[] = [];

	constructor(size: number, enemies: number = 0, pane: Tweakpane) {
		for (let i = 0; i < size; i++) this.boids.push(new Boid());
		for (let i = 0; i < enemies; i++) this.boids.push(new Enemy(pane));
	}

	render(ctx: CanvasRenderingContext2D) {
		this.boids = this.boids.filter((b) => b.alive);

		for (let boid of this.boids) {
			boid.flock(this.boids);
			boid.tick();
			boid.render(ctx);
		}
	}
}
