import Vec2 from '../Vec2';
import Birdoid from './Birdoid';
import Pane from '../Pane';

export default class Enemy extends Birdoid {
	public label: string = 'enemy';

	public color: string = '#ff0000';

	public minSpeed: number = 2.6;
	public maxSpeed: number = 4.3;

	public fov: number = 320;
	public viewDistance: number = 300;

	public urge: number = 0;
	public range: number = 6;

	public target: Birdoid | null = null;

	constructor() {
		super();
		Pane.addEnemy(this);
	}

	public flock(others: Birdoid[]) {
		const seperation = new Vec2();
		let nearest: [Birdoid | null, number] = [null, Infinity];
		let boidsInView: number = 0;

		for (let other of others) {
			if (other === this) continue;

			if (this.canView(other)) {
				const distVector = other.pos.copy().subtract(this.pos);
				seperation.add(distVector.inverse().divide(distVector.length));
				boidsInView++;
				if (nearest[1] > distVector.length && other.label !== 'enemy') {
					nearest = [other, distVector.length];
				}
				if (
					other.pos.x < this.pos.x + this.range &&
					other.pos.x > this.pos.x - this.range &&
					other.pos.y < this.pos.y + this.range &&
					other.pos.y > this.pos.y - this.range &&
					other.alive &&
					other.label !== 'enemy'
				) {
					other.alive = false;
					this.urge -= 250;
				}
			}
		}

		if (nearest[0] && this.urge >= 450) {
			const killUrge = nearest[0].pos
				.copy()
				.subtract(this.pos)
				.setMagnitude(0.28);

			this.acc.add(killUrge);
		} else if (this.urge < 1000) {
			seperation.divide(boidsInView).limit(0.08);
			this.acc.add(seperation);
		}
		this.urge++;
		if (this.urge > 1000) this.urge = 1000;
		if (this.urge < 0) this.urge = 0;
	}
}
