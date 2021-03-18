import Vec2 from './utils/Vec2';
import Boid from './Boid';

export default class Flock {
	public boids: Boid[] = [];

	public cohesion: number = 1;
	public alignment: number = 1;
	public seperation: number = 1;

	private ctx: CanvasRenderingContext2D | null;
	private animation: number = 0;

	constructor(size: number, ctx: CanvasRenderingContext2D | null) {
		for (let i = 0; i < size; i++) this.boids.push(new Boid());

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

			let boidsInView = 0;

			for (let other of this.boids) {
				if (boid == other) continue;

				const distVector = other.pos.copy().subtract(boid.pos);
				const fov: number = (boid.fov * Math.PI) / 180;

				const relAngle = Math.abs(
					Math.atan2(boid.vel.y, boid.vel.x) -
						Math.atan2(distVector.y, distVector.x)
				);

				const inDistance: boolean = distVector.length <= boid.viewDistance;

				const inFOV: boolean =
					relAngle < fov / 2 || relAngle > 2 * Math.PI - fov / 2;

				if (inDistance && inFOV) {
					boidsInView++;

					alignment.add(other.vel);
					cohesion.add(other.pos);
					seperation.add(distVector.inverse().divide(distVector.length));
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

			boid.acc.add(alignment);
			boid.acc.add(cohesion);
			boid.acc.add(seperation);

			boid.tick();
			boid.render(this.ctx);
		}

		this.animation = requestAnimationFrame(this.render.bind(this));
	}
}
