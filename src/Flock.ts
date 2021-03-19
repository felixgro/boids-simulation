import Vec2 from './utils/Vec2';
import Boid from './Boid';
import Enemy from './Boids/Enemy';

export default class Flock {
	public boids: Boid[] = [];

	public cohesion: number = 1;
	public alignment: number = 1;
	public seperation: number = 1;

	private ctx: CanvasRenderingContext2D | null;
	private animation: number = 0;

	constructor(size: number, ctx: CanvasRenderingContext2D | null) {
		for (let i = 0; i < size; i++) this.boids.push(new Boid());

		this.boids.push(new Enemy());

		this.ctx = ctx;
	}

	start() {
		this.animation = requestAnimationFrame(this.render.bind(this));
	}

	stop() {
		window.cancelAnimationFrame(this.animation);
	}

	render() {
		if (!this.ctx) return;

		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		for (let boid of this.boids) {
			const cohesion = new Vec2();
			const alignment = new Vec2();
			const seperation = new Vec2();

			let boidsInView: number = 0;
			let nearest: [Boid | null, number] = [null, Infinity];

			for (let other of this.boids) {
				if (boid == other) continue;

				const distVector = other.pos.copy().subtract(boid.pos);

				// KILL!
				if (boid.label === 'enemy' && distVector.length < boid.range) {
					this.boids.splice(this.boids.indexOf(other), 1);
				}

				if (distVector.length < nearest[1]) {
					nearest = [other, distVector.length];
				}

				const fov: number = (boid.fov * Math.PI) / 180;

				const relAngle = Math.abs(
					Math.atan2(boid.vel.y, boid.vel.x) -
						Math.atan2(distVector.y, distVector.x)
				);

				const inDistance: boolean = distVector.length <= boid.viewDistance;

				const inFOV: boolean =
					relAngle < fov / 2 || relAngle > 2 * Math.PI - fov / 2;

				if (inDistance && inFOV && other.label !== 'enemy') {
					boidsInView++;

					alignment.add(other.vel);
					cohesion.add(other.pos);
					seperation.add(distVector.inverse().divide(distVector.length));
				} else if (inDistance && inFOV && other.label === 'enemy') {
					boid.acc.add(distVector.copy().inverse().limit(0.32));
				}
			}

			if (boidsInView > 0) {
				alignment
					.divide(boidsInView)
					.setMagnitude(3)
					.subtract(boid.vel)
					.limit(0.22)
					.multiply(this.alignment);

				cohesion
					.divide(boidsInView)
					.subtract(boid.pos)
					.setMagnitude(3)
					.limit(0.24)
					.multiply(this.cohesion);

				seperation
					.divide(boidsInView)
					.setMagnitude(3)
					.limit(0.315)
					.multiply(this.seperation);
			}

			if (boid.label === 'enemy') {
				const distVector = nearest[0]?.pos.copy().subtract(boid.pos);
				if (distVector && distVector.length < boid.viewDistance)
					boid.acc.add(distVector.setMagnitude(3));
			} else {
				boid.acc.add(seperation);
				boid.acc.add(cohesion);
				boid.acc.add(alignment);
			}

			boid.tick();
			boid.render(this.ctx);
		}

		this.animation = requestAnimationFrame(this.render.bind(this));
	}
}
