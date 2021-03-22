import Tweakpane from 'tweakpane';
import Flock from './Boids/Flock';
import Enemy from './Boids/Enemy';

namespace Pane {
	const pane = new Tweakpane({ title: 'Settings' });

	let totalEnemies = 0;

	const setup = { boids: 100, enemies: 1 };

	const reset = () => {
		totalEnemies = 0;
		enemies.dispose();
		enemies = pane.addFolder({ title: 'enemies', expanded: false });
		Flock.getInstance().init(setup.boids, setup.enemies);
	};

	pane
		.addInput(setup, 'boids', {
			min: 0,
			max: 300,
			step: 1,
		})
		.on('change', reset);

	pane
		.addInput(setup, 'enemies', {
			min: 0,
			max: 5,
			step: 1,
		})
		.on('change', reset);

	let enemies = pane.addFolder({ title: 'enemies', expanded: false });

	export function addEnemy(enemy: Enemy) {
		totalEnemies++;

		const folder = enemies.addFolder({
			title: `enemy #${totalEnemies}`,
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
	}
}

export default Pane;
