var mission;
var states = {};
var characters = {};
var actions = {};

var activeCharacter = null;

function main() {
	// Init states
	states = {
		ignition: new State('ignition', 'Ignition', 1, {newState: 'fire'}, ['extinguisher', 'depressurization']),
		fire: new State('fire', 'Fire', 1, {hp: -1}, ['extinguisher', 'depressurization']),
		activeDepressurization: new State('activeDepressurization', 'Depressurization system is activate', 1, {}, [])
	};

	// Init actions
	actions = {
		extinguisher: new Action(
			'extinguisher',
			'Use fire extinguisher',
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
			'Depressurization cell',
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
			'Bruce Willis',
			'saver',
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
			'Sheldon Cooper',
			'physic',
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
			'Gregory House',
			'medic',
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
		room1: new Room('room1', 'Room 1', ['ignition']),
		room2: new Room('room2', 'Room 2', ['fire', 'activeDepressurization'])
	};

	// Init mission 1
	mission = new Mission(rooms);

	show();
}