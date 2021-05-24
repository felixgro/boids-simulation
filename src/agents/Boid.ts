import Vec2, { draw, toRadians } from '@felixgro/vec2';
import Agent from './Agent';
import GlobalState from '../global';

const state = GlobalState.boids;

export default class Boid extends Agent {
    public label = 'boid';

    flock(agentsInView: Agent[], ctx: CanvasRenderingContext2D): void {
        const alignment = new Vec2();
        const cohesion = new Vec2();
        const seperation = new Vec2();

        let boidsInView = 0;

        for (const agent of agentsInView) {
            const dist = this.pos.clone().subtract(agent.pos);

            seperation.add(dist.setMagnitude(this.viewDistance - dist.length));
            alignment.add(agent.vel);
            cohesion.add(agent.pos);

            boidsInView++;
        }

        if (boidsInView > 0) {
            alignment.divide(boidsInView)
                .subtract(this.vel)
                .multiply(state.alignment);

            cohesion.divide(boidsInView)
                .subtract(this.pos)
                .multiply(state.cohesion);

            seperation.divide(boidsInView)
                .multiply(state.seperation * 2.5);

            this.acc.add(alignment);
            this.acc.add(cohesion);
            this.acc.add(seperation);
        }

        // Render optional data
        if (state.showFov) this.renderFov(ctx);
        if (state.showVelocity) draw(this.vel, ctx, { origin: this.pos, width: 1, color: '#171724' });
        if (state.showSeperation && seperation.length > 1) draw(seperation, ctx, { origin: this.pos, color: 'red', width: 1 });
        if (state.showCohesion && cohesion.length > 1) draw(cohesion, ctx, { origin: this.pos, color: 'green', width: 1 });
        if (state.showAlignment && alignment.length > 5) draw(alignment, ctx, { origin: this.pos, color: 'blue', width: 1 });
    }
}