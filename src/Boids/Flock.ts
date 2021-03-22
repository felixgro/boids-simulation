import Tweakpane from 'tweakpane';
import Birdoid from './Birdoid';

import Boid from './Boid';
import Enemy from './Enemy';

export default class Flock {
	public boids: Birdoid[] = [];

	private static instance: Flock;

	private constructor() {
		this.init(100, 1);
	}

	static getInstance() {
		if (!Flock.instance) Flock.instance = new Flock();

		return Flock.instance;
	}

	init(size: number, enemies: number) {
		this.boids = [];
		for (let i = 0; i < size; i++) this.boids.push(new Boid());
		for (let i = 0; i < enemies; i++) this.boids.push(new Enemy());
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
