import Boid from '../Boid';

export default class Enemy extends Boid {
	public label: string = 'enemy';

	public color: string = 'red';

	// public width: number = 10;
	// public height: number = 15;

	public minSpeed: number = 1.3;
	public maxSpeed: number = 3.2;

	public viewDistance: number = 50;

	public range: number = 13;

	constructor() {
		super();
	}
}
