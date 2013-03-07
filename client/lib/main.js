var mission;
var states = {};
var characters = {};
var actions = {};

var activeCharacter = null;

function main() {
	// Init states
	states = {
		ignition: new State('ignition', 'Возгорание', 1, {newState: 'fire'}, ['extinguisher', 'depressurization']),
		fire: new State('fire', 'Пожар', 1, {hp: -1}, ['extinguisher', 'depressurization']),
		activeDepressurization: new State('activeDepressurization', 'Системе разгерметизации активна', 1, {}, [])
	};

	// Init actions
	actions = {
		extinguisher: new Action(
			'extinguisher',
			'Использовать огнетушитель',
			['repair'],			
			{
				ignition: {
					no: 8
				},
				fire: {
					no: 12,
					ignition: 7
				}
			},
			[]
		),
		depressurization: new Action(
			'depressurization',
			'Разгерметизировать отсек',
			['programming'],
			{
				ignition: {
					no: 8
				},
				fire: {
					no: 12,
					ignition: 7
				}
			},
			['activeDepressurization']
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

	// Init mission 1 rooms
	var rooms = {
		room1: new Room('room1', 'Комната 1', ['ignition']),
		room2: new Room('room2', 'Комната 2', ['fire', 'activeDepressurization'])
	};

	// Init mission 1
	mission = new Mission(rooms);

	show();
}