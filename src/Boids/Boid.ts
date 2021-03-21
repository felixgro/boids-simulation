import Vec2 from '../Vec2';
import Birdoid from './Birdoid';

export default class Boid extends Birdoid {
	public label: string = 'boid';

	public cohesion: number = 1;
	public alignment: number = 1;
	public seperation: number = 1;

	flock(others: Birdoid[]) {
		const cohesion = new Vec2();
		const alignment = new Vec2();
		const seperation = new Vec2();

		const survival = new Vec2();

		let boidsInView: number = 0;
		let enemiesInView: number = 0;

		for (let other of others) {
			if (other === this) continue;
			if (this.canView(other)) {
				const distVector = other.pos.copy().subtract(this.pos);

				if (other.label == 'enemy') {
					survival.add(distVector.copy().divide(distVector.length));
					enemiesInView++;
				} else {
					alignment.add(other.vel);
					cohesion.add(other.pos);
					seperation.add(distVector.inverse().divide(distVector.length));

					boidsInView++;
				}
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

		if (enemiesInView > 0) {
			survival.divide(enemiesInView).inverse().setMagnitude(0.45);
		}

		this.acc.add(seperation);
		this.acc.add(cohesion);
		this.acc.add(alignment);
		this.acc.add(survival);
	}
}