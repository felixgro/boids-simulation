import * as Dat from 'dat.gui';
import { toRadians } from '@felixgro/vec2';
import Flock from './Flock';
import Boid from './agents/Boid';
import GlobalState from './global';

export default class Controller {
    public flock: Flock;
    public boidsGui: Dat.GUI;
    // public predatorsGui: Dat.GUI;

    private static instance: Controller;

    private constructor() {
        this.flock = new Flock(GlobalState.boids.amount);

        this.boidsGui = new Dat.GUI();
        // this.predatorsGui = this.boidsGui.addFolder('Predators');

        this.initBoidsGui();
    }

    public static getInstance(): Controller {
        if (!Controller.instance)
            Controller.instance = new Controller();

        return Controller.instance;
    }

    private setBoidsAmount(amount: number): void {
        if (amount < this.flock.boids.length && amount >= 0) {
            this.flock.boids.splice(0, this.flock.boids.length - amount);
            return
        }

        for (let i = 0; i < amount - this.flock.boids.length + 1; i++) this.flock.boids.push(new Boid());
    }

    private initBoidsGui(): void {
        this.boidsGui.add(GlobalState.boids, 'amount', 0, 100, 1).onChange(v => this.setBoidsAmount(v));

        this.boidsGui.add(GlobalState.boids, 'cohesion', 0, 1, 0.01);
        this.boidsGui.add(GlobalState.boids, 'seperation', 0, 1, 0.01);
        this.boidsGui.add(GlobalState.boids, 'alignment', 0, 1, 0.01);

        this.boidsGui.add(GlobalState.boids, 'viewDistance', 1, 300, 1).onChange(v => this.flock.boids.forEach(b => b.viewDistance = v));
        this.boidsGui.add(GlobalState.boids, 'fov', 1, 360, 1).onChange(v => this.flock.boids.forEach(b => b.fov = toRadians(v)));

        const renderFolder = this.boidsGui.addFolder('Render');
        renderFolder.add(GlobalState.boids, 'showFov');
        renderFolder.add(GlobalState.boids, 'showVelocity');
        renderFolder.add(GlobalState.boids, 'showAlignment');
        renderFolder.add(GlobalState.boids, 'showCohesion');
        renderFolder.add(GlobalState.boids, 'showSeperation');
    }
}