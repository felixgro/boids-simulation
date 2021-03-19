import Birdoid from './Birdoid';

import Boid from './Boid';
import Enemy from './Enemy';

export default class Flock {
	public boids: Birdoid[] = [];

	constructor(size: number) {
		for (let i = 0; i < size; i++) this.boids.push(new Boid());

		// this.boids.push(new Enemy());
	}

	render(ctx: CanvasRenderingContext2D) {
		for (let boid of this.boids) {
			boid.flock(this.boids);
			boid.tick();
			boid.render(ctx);
		}
	}
}
