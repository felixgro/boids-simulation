import Vec2, { randomBetween } from '@felixgro/vec2';

export default abstract class Agent {
    public tag = 'agent';
    public alive = true;

    public pos: Vec2;
    public vel: Vec2;
    public acc: Vec2;

    public speedMin = 140;
    public speedMax = 180;
    public steerForce = 10;

    public viewDistance = 75;
    public fov = Math.PI * 2;

    public color = '#fff';
    public width = 6;
    public height = 10;
    public showFov = false;
    public showVel = false;

    constructor() {
        this.pos = randomBetween(new Vec2(), new Vec2(window.innerWidth, window.innerHeight));
        this.vel = Vec2.random().setMagnitude(this.speedMin + (this.speedMax - this.speedMin) * Math.random());
        this.acc = new Vec2();
    }

    flock(agentsInView: Agent[], ctx: CanvasRenderingContext2D): void { }

    tick(delta: number): void {
        this.stayInBounds();
        this.vel.clampMagnitude(this.speedMin, this.speedMax);
        this.acc.clampMagnitude(0, this.steerForce);

        this.pos.add(this.vel.clone().multiply(delta));
        this.vel.add(this.acc);

        this.acc.multiply(0);
    }

    filterAgents(agents: Agent[], ctx: CanvasRenderingContext2D): void {
        const agentsInView: Agent[] = [];

        for (const agent of agents)
            if (this.canSeeAgent(agent)) agentsInView.push(agent);

        this.flock(agentsInView, ctx);
    }

    canSeeAgent(agent: Agent): boolean {
        if (this === agent) return false;

        const dist = agent.pos.clone().subtract(this.pos);
        const inDistance = dist.length <= this.viewDistance;

        const angle = Math.abs(this.vel.angleTo(dist));
        const inFov = angle < this.fov / 2 || angle > 2 * Math.PI - this.fov / 2;

        return inDistance && inFov;
    }

    stayInBounds(): void {
        const margin = 150;
        const force = new Vec2();

        if (this.pos.x < margin)
            force.add(Vec2.right());

        if (this.pos.x > window.innerWidth - margin)
            force.add(Vec2.left());

        if (this.pos.y < margin)
            force.add(Vec2.down());

        if (this.pos.y > window.innerHeight - margin)
            force.add(Vec2.up());

        this.acc.add(force.multiply(this.viewDistance * 10));
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save();

        ctx.fillStyle = this.color;

        // center origin & rotate in direction of velocity vector
        ctx.translate(...this.pos.rawPosition);
        ctx.rotate(Vec2.up().angleTo(this.vel));

        // draw agent
        ctx.beginPath();
        ctx.moveTo(0, -this.height / 2);
        ctx.lineTo(-this.width / 2, this.height / 2);
        ctx.lineTo(this.width / 2, this.height / 2);
        ctx.fill();

        ctx.restore();
    }

    renderFov(ctx: CanvasRenderingContext2D) {
        ctx.save();

        ctx.strokeStyle = '#171724';
        ctx.translate(...this.pos.rawPosition);
        ctx.rotate(Vec2.up().angleTo(this.vel));
        ctx.beginPath();

        if (this.fov === 2 * Math.PI) {
            ctx.ellipse(0, 0, this.viewDistance, this.viewDistance, 0, 0, Math.PI * 2);
        } else {
            ctx.arc(0, 0, this.viewDistance, Math.PI * 1.5 - this.fov / 2, Math.PI * -0.5 + this.fov / 2);
            // left line
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos((this.fov + Math.PI) / 2) * this.viewDistance, Math.sin((this.fov - Math.PI) / 2) * this.viewDistance);
            // right line
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos((Math.PI - this.fov) / 2) * this.viewDistance, Math.sin((Math.PI - this.fov) / -2) * this.viewDistance);
        }

        ctx.stroke();
        ctx.restore();
    }
}