import Vec2 from '../Vec2';
import Birdoid from './Birdoid';

export default class Boid extends Birdoid {
	public cohesion: number = 1;
	public alignment: number = 1;
	public seperation: number = 1;

	flock(others: Birdoid[]) {
		const cohesion = new Vec2();
		const alignment = new Vec2();
		const seperation = new Vec2();

		let boidsInView: number = 0;

		for (let other of others) {
			if (this.canView(other)) {
				const distVector = other.pos.copy().subtract(this.pos);

				alignment.add(other.vel);
				cohesion.add(other.pos);
				seperation.add(distVector.inverse().divide(distVector.length));

				if (other.label == 'enemy') {
					this.acc.add(distVector.copy());
				}
				boidsInView++;
			}
		}

		if (boidsInView > 0) {
			alignment
				.divide(boidsInView)
				.setMagnitude(3)
				.subtract(this.vel)
				.limit(0.22)
				.multiply(this.alignment);

			cohesion
				.divide(boidsInView)
				.subtract(this.pos)
				.setMagnitude(3)
				.limit(0.24)
				.multiply(this.cohesion);

			seperation
				.divide(boidsInView)
				.setMagnitude(3)
				.limit(0.315)
				.multiply(this.seperation);
		}

		this.acc.add(seperation);
		this.acc.add(cohesion);
		this.acc.add(alignment);
	}
}
