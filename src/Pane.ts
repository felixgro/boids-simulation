import Flock from './Boids/Flock';
import Enemy from './Boids/Enemy';

import Tweakpane from 'tweakpane';
import { FolderApi } from '../node_modules/tweakpane/lib/api/folder';

namespace Pane {
	const pane = new Tweakpane({ title: 'Settings' });

	const settings = { boids: 100, enemies: 1 };

	pane
		.addInput(settings, 'boids', {
			min: 0,
			max: 300,
			step: 1,
		})
		.on('change', (e) => {
			clear();
			Flock.getInstance().init(settings.boids, settings.enemies);
		});
	pane.refresh();

	pane
		.addInput(settings, 'enemies', {
			min: 0,
			max: 10,
			step: 1,
		})
		.on('change', (e) => {
			clear();
			Flock.getInstance().init(settings.boids, settings.enemies);
		});

	let totalEnemies = 0;
	let folders: FolderApi[] = [];
	const clear = () => {
		totalEnemies = 0;
		folders.forEach((f) => {
			f.dispose();
		});
	};

	export function addEnemy(enemy: Enemy) {
		totalEnemies++;

		const folder = pane.addFolder({
			title: `Enemy #${totalEnemies}`,
			expanded: false,
		});

		folder.addInput(enemy, 'color', {
			input: 'color.rgba',
		});

		folder.addInput(enemy, 'minSpeed', {
			min: 0,
			max: 10,
		});

		folder.addInput(enemy, 'maxSpeed', {
			min: 0,
			max: 10,
		});

		folder.addMonitor(enemy, 'urge', {
			label: 'hunger',
			view: 'graph',
			min: 0,
			max: 1000,
		});

		folders.push(folder);
	}
}

export default Pane;
