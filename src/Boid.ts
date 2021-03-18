import Vec2 from './utils/Vec2';
import { randomVector } from './utils/vector';

export default class Boid {
	public pos: Vec2;
	public vel: Vec2;
	public acc: Vec2;

	public color: string = '#fff';
	public width: number = 6;
	public height: number = 10;

	public fov: number = 320;
	public viewDistance: number = 42;

	public steeringForce: number = 0.2;

	public minSpeed: number = 1.2;
	public maxSpeed: number = 4;

	constructor() {
		this.pos = randomVector(window.innerWidth, window.innerHeight);
		this.vel = Vec2.random(3);
		this.acc = new Vec2();
	}

	tick() {
		this.stayInBounds();

		this.vel.limit(this.maxSpeed, this.minSpeed);

		this.pos.add(this.vel);
		this.vel.add(this.acc);

		this.acc.multiply(0);
	}

	stayInBounds() {
		const margin: number = 100;

		if (this.pos.x < margin) {
			this.acc.add(new Vec2(this.steeringForce, 0));
		}

		if (this.pos.x > window.innerWidth - margin) {
			this.acc.add(new Vec2(-this.steeringForce, 0));
		}

		if (this.pos.y < margin) {
			this.acc.add(new Vec2(0, this.steeringForce));
		}

		if (this.pos.y > window.innerHeight - margin) {
			this.acc.add(new Vec2(0, -this.steeringForce));
		}

		this.acc.limit(1);
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.translate(this.pos.x, this.pos.y);

		// rotate in direction of velocity vector
		const dirRad = Math.atan2(this.vel.y, this.vel.x) + Math.PI / 2;
		ctx.rotate(dirRad);

		// draw Boid as triangle
		ctx.beginPath();
		ctx.moveTo(0, -this.height / 2);
		ctx.lineTo(-this.width / 2, this.height / 2);
		ctx.lineTo(this.width / 2, this.height / 2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();

		ctx.translate(-this.pos.x, -this.pos.y);
		ctx.restore();
	}
}
