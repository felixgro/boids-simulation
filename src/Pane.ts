import Tweakpane from 'tweakpane';
import 'tweakpane-plugin-interval';

import { FolderApi } from '../node_modules/tweakpane/lib/api/folder';

import Flock from './Boids/Flock';
import Enemy from './Boids/Enemy';

namespace Pane {
	const pane = new Tweakpane({ title: 'Settings' });
	let boidsFolder: FolderApi;
	let enemyFolder: FolderApi;

	const state = { boids: 100, enemies: 1 };

	export const getInitialState = (): number[] => Object.values(state);

	export const initPane = () => {
		addMainInput();

		const boidStats = {
			color: '#ffffff',
			alignment: 1,
			seperation: 1,
			cohesion: 1,
			showFOV: false,
			fov: 360,
			viewDistance: 100,
		};

		boidsFolder = pane.addFolder({ title: 'boids' });

		boidsFolder
			.addInput(boidStats, 'color', { input: 'color.rgba' })
			.on('change', (v) => {
				Flock.getInstance().boids.forEach((b: any) => {
					if (b.label == 'boid') b.color = v.value;
				});
			});

		boidsFolder
			.addInput(boidStats, 'alignment', { min: 0, max: 1 })
			.on('change', (v) => {
				Flock.getInstance().boids.forEach((b: any) => {
					if (b.label == 'boid') b.alignment = v.value;
				});
			});

		boidsFolder
			.addInput(boidStats, 'seperation', { min: 0, max: 1 })
			.on('change', (v) => {
				Flock.getInstance().boids.forEach((b: any) => {
					if (b.label == 'boid') b.seperation = v.value;
				});
			});

		boidsFolder
			.addInput(boidStats, 'cohesion', { min: 0, max: 1 })
			.on('change', (v) => {
				Flock.getInstance().boids.forEach((b: any) => {
					if (b.label == 'boid') b.cohesion = v.value;
				});
			});

		boidsFolder.addInput(boidStats, 'showFOV').on('change', (v) => {
			Flock.getInstance().boids.forEach((b: any) => {
				if (b.label == 'boid') b.showFOV = v.value;
			});
		});

		boidsFolder
			.addInput(boidStats, 'fov', { min: 1, max: 360 })
			.on('change', (v) => {
				Flock.getInstance().boids.forEach((b: any) => {
					if (b.label == 'boid') b.fov = v.value;
				});
			});

		boidsFolder
			.addInput(boidStats, 'viewDistance', {
				min: 1,
				max: 500,
				label: 'distance',
			})
			.on('change', (v) => {
				Flock.getInstance().boids.forEach((b: any) => {
					if (b.label == 'boid') b.viewDistance = v.value;
				});
			});

		enemyFolder = pane.addFolder({ title: 'enemies', expanded: false });
	};

	export const reset = () => {
		if (enemyFolder) enemyFolder.dispose();
		enemyFolder = pane.addFolder({ title: 'enemies', expanded: false });

		if (Flock) Flock.getInstance().init(...getInitialState());
	};

	export const addMainInput = () => {
		pane
			.addInput(state, 'boids', {
				min: 0,
				max: 300,
				step: 1,
			})
			.on('change', reset);

		pane
			.addInput(state, 'enemies', {
				min: 0,
				max: 3,
				step: 1,
			})
			.on('change', reset);
	};

	export function addEnemy(enemy: Enemy) {
		enemyFolder.addInput(enemy, 'color', { input: 'color.rgba' });

		const speedLimit = {
			speed: { min: enemy.minSpeed, max: enemy.maxSpeed },
		};

		enemyFolder
			.addInput(speedLimit, 'speed', {
				min: 0,
				max: 10,
				label: 'speed',
			})
			.on('change', (v) => {
				enemy.minSpeed = v.value.min;
				enemy.maxSpeed = v.value.max;
			});

		enemyFolder.addInput(enemy, 'showFOV');

		enemyFolder.addInput(enemy, 'fov', {
			min: 1,
			max: 360,
		});

		enemyFolder.addInput(enemy, 'viewDistance', {
			label: 'distance',
			min: 1,
			max: 500,
		});

		enemyFolder.addMonitor(enemy, 'urge', {
			label: 'hunger',
			view: 'graph',
			min: 0,
			max: 1000,
		});

		enemyFolder.addSeparator();
	}

	initPane();
}

export default Pane;
