var mission;
var states = {};
var characters = {};
var actions = {};

var activeCharacter = null;

function main() {
	states = {
		ignition: new State('ignition', 'Возгорание', 1, {newState: 'fire'}, ['extinguisher', 'useDepressurization']),
		fire: new State('fire', 'Пожар', 1, {hp: 1}, ['extinguisher', 'useDepressurization']),
		notActiveDepressurization: new State('notActiveDepressurization', 'Система разгерметизации неактивна', 1, {}, ['activateDepressurization']),
		activeDepressurization: new State('activeDepressurization', 'Система разгерметизации активна', 1, {}, [])
	};

	// Init actions
	actions = {
		extinguisher: new Action(
			'extinguisher',
			'Использовать огнетушитель',
			['engineering'],
			{
				ignition: {
					difficult: 8,
					to: 'no'
				},
				fire: {
					difficult: 12,
					to: 'no'
				}
			},
			[]
		),
		useDepressurization: new Action(
			'useDepressurization',
			'Разгерметизировать отсек',
			['programming'],
			{
				ignition: {
					difficult: 6,
					to: 'no'
				},
				fire: {
					difficult: 6,
					to: 'no'
				}
			},
			['activeDepressurization']
		),
		activateDepressurization: new Action(
			'activateDepressurization',
			'Активировать систему разгерметизации',
			['programming'],
			{
				notActiveDepressurization: {
					difficult: 12,
					to: 'activeDepressurization'
				}
			},
			[]
		)
	};

	characters = {
		saver: new Character(
			'saver',
			'Брюс Уиллис',
			'Спасатель',
			{
				engineering: 3,
				medicine: 3,
				physics: 3,
				programming: 3
			},
			{}
		)		
	};

	// Init mission 1 rooms
	var modules = {
		hq: new Module('hq', 3, 1, 'Командный центр', 5, ['ignition']),
		rt: new Module('rt', 2, 1, 'Реактор', 5, ['ignition']),
		med: new Module('med', 1, 1, 'Мед. блок', 5, ['fire', 'notActiveDepressurization']),
		lb: new Module('lb', 2, 2, 'Спасательная шлюпка', 5, [])
	};

	characters.saver.moduleId = 'lb';

	// Init mission 1
	mission = new Mission(modules);

	viewer.showMap(mission);
	return 1;
}

