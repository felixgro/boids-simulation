import Vec2 from './Vec2';

export const dist = (v1: Vec2, v2: Vec2): number => {
	const dx = Math.abs(v1.x - v2.x);
	const dy = Math.abs(v1.y - v2.y);

	return Math.sqrt(dx * dx + dy * dy);
};

export const randomVector = (w: number, h: number): Vec2 => {
	const x = Math.random() * w;
	const y = Math.random() * h;

	return new Vec2(x, y);
};
