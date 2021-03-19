import Vec2 from '../Vec2';
import Birdoid from './Birdoid';

export default class Enemy extends Birdoid {
	public label: string = 'enemy';

	public color: string = 'red';

	public minSpeed: number = 3;
	public maxSpeed: number = 7.2;

	public fov: number = 320;
	public viewDistance: number = 300;

	public range: number = 13;

	public flock(others: Birdoid[]) {
		let nearest: [Birdoid | null, number] = [null, Infinity];

		for (let other of others) {
			if (this.canView(other)) {
				const distVector = other.pos.copy().subtract(this.pos);
				if (nearest[1] > distVector.length) {
					nearest = [other, distVector.length];
				}
			}
		}

		if (nearest[0]) {
			const killUrge = nearest[0].pos
				.copy()
				.subtract(this.pos)
				.setMagnitude(3)
				.limit(0.8);

			this.acc.add(killUrge);
		}
	}
}
