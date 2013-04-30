var mission;
var states = {};
var characters = {};
var actions = {};

var activeCharacter = null;

function main() {
	alert(1);
	// Init states
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
				engineering: 9,
				medicine: 6,
				physics: 3,
				programming: 3
			},
			{}
		),
		physic: new Character(
			'physic',
			'Шелдон Купер',
			'Физик-теоретик',
			{
				engineering: 3,
				medicine: 3,
				physics: 9,
				programming: 6
			},
			{}
		),
		medic: new Character(
			'medic',
			'Грегори Хаус',
			'Диагност, иммунолог',
			{
				engineering: 3,
				medicine: 9,
				physics: 6,
				programming: 3
			},
			{}
		)
	};

	alert(1);

	// Init mission 1 rooms
	var rooms = {
		room1: new Room('room1', 1, 1, 'Комната 1', 5, ['ignition']),
		room2: new Room('room2', 2, 1, 'Комната 2', 5, ['fire', 'notActiveDepressurization'])
	};

	// Init mission 1
	mission = new Mission(rooms);

	viewer.showMap(mission);
}