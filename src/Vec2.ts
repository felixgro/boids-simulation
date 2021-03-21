class Vec2 {
	constructor(public x: number = 0, public y: number = 0) {}

	static random(max_length?: number, strict: boolean = false): Vec2 {
		let x: number = Math.round(Math.random()) ? 1 : -1;
		let y: number = Math.round(Math.random()) ? 1 : -1;

		const vec = new Vec2(x, y).toUnit();

		if (max_length) {
			const len = strict ? max_length : Math.random() * max_length;
			vec.setMagnitude(len);
		}

		return vec;
	}

	get length(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	add(v: Vec2): Vec2 {
		this.x += v.x;
		this.y += v.y;

		return this;
	}

	subtract(v: Vec2): Vec2 {
		this.x -= v.x;
		this.y -= v.y;

		return this;
	}

	multiply(n: number): Vec2 {
		this.x *= n;
		this.y *= n;

		return this;
	}

	divide(n: number): Vec2 {
		if (n === 0) return this;

		this.x /= n;
		this.y /= n;

		return this;
	}

	inverse(): Vec2 {
		this.x *= -1;
		this.y *= -1;

		return this;
	}

	toUnit(): Vec2 {
		this.divide(this.length);

		return this;
	}

	setMagnitude(mag: number = 1): Vec2 {
		this.toUnit();
		this.multiply(mag);

		return this;
	}

	limit(max_len: number, min_len: number = 0): Vec2 {
		if (this.length > max_len) this.setMagnitude(max_len);
		if (this.length < min_len) this.setMagnitude(min_len);

		return this;
	}

	copy(): Vec2 {
		return new Vec2(this.x, this.y);
	}
}

export default Vec2;
