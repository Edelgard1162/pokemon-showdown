'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Eviolite', () => {
	afterEach(() => {
		battle.destroy();
	});

	it(`should multiply the defenses of a Pokemon that can evolve by 1.5`, () => {
		battle = common.createBattle([[
			{ species: 'Omanyte', ability: 'shellarmour', item: 'eviolite', moves: ['rest'] },
		], [
			{ species: 'Cherrim', moves: ['seedbomb', 'megadrain'] },
		]]);
		battle.makeChoices();
		assert.false.fainted(battle.p1.active[0]);
		battle.makeChoices('auto', 'move megadrain');
		assert.false.fainted(battle.p1.active[0]);
	});

	it(`should not multiply the defenses of a Pokemon that cannot evolve by 1.5`, () => {
		battle = common.createBattle([[
			{ species: 'Omastar', ability: 'shellarmour', item: 'eviolite', moves: ['rest'] },
			{ species: 'Omastar', ability: 'shellarmour', item: 'eviolite', moves: ['rest'] },
		], [
			{ species: 'Sceptile', item: 'meadowplate', moves: ['leafblade', 'megadrain'] },
		]]);
		battle.makeChoices();
		assert.fainted(battle.p1.active[0]);
		battle.makeChoices(); // switch in the second Omastar
		battle.makeChoices('auto', 'move megadrain');
		assert.fainted(battle.p1.active[0]);
	});

	it(`should multiply the defenses of a National Dex Pokemon that can evolve by 1.5`, () => {
		battle = common.createBattle([[
			{ species: 'Geodude', ability: 'shellarmour', item: 'eviolite', moves: ['rest'] },
		], [
			{ species: 'Roserade', moves: ['seedbomb', 'absorb'] },
		]]);
		battle.makeChoices();
		assert.false.fainted(battle.p1.active[0]);
		battle.makeChoices('auto', 'move absorb');
		assert.false.fainted(battle.p1.active[0]);
	});
});
