import Boid from './agents/Boid';

export default class Flock {
    public boids: Boid[] = [];

    constructor(boids: number) {
        for (let i = 0; i < boids; i++)
            this.boids.push(new Boid());
    }

    render(ctx: CanvasRenderingContext2D, delta: number): void {
        const agents = [...this.boids];

        for (const agent of agents) {
            agent.filterAgents(agents, ctx);
            agent.tick(delta);
            agent.render(ctx);
        }
    }
}