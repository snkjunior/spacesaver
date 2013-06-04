var mission = {};

// Название миссии
mission.name = "Mission 1";
mission.goals = [
	{
		priority: 'primary',
		time: 3,
		type: 'evacuate',
		value: 3,
		active: true
	},
	{
		priority: 'secondary',
		time: 2,
		type: 'moduleHasNoStates',
		value: {
			moduleId: 'reaktor',
			states: ['fire', 'ignition']
		},
		active: true
	},
	{
		priority: 'primary',
		time: -1,
		type: 'moduleSurvive',
		value: 'reaktor',
		active: true
	},
	{
		priority: 'secondary',
		time: 2,
		type: 'moduleHasNoStates',
		value: {
			moduleId: 'cargobay',
			states: ['fire', 'ignition']
		},
		active: false
	}
];

// Модули миссии
mission.modules = {};
mission.modules.reaktor = {
	id: "reaktor",
	x: 2,
	y: 2,
	hp: 3,
	name: "Реактор",
	states: ["ignition"]
}

mission.modules.cargobay = {
	id: "cargobay",
	x: 3,
	y: 2,
	hp: 3,
	name: "Грузовой отсек",
	states: ["personal", "personal_injured", "fire"]
}

mission.modules.deckhouse = {
	id: "deckhouse",
	x: 4,
	y: 2,
	hp: 2,
	name: "Рубка",
	states: ["fire"]
}

mission.modules.lifeboat = {
	id: "lifeboat",
	x: 3,
	y: 3,
	hp: 1,
	name: "Спасательная шлюпка",
	states: ["evacuation_point"]
}

// Скрипты миссии - ПОКА НЕ РАБОТАЮТ!!!
//mission.scripts = [];
//mission.scripts.push({
//	turn: 2,
//	type: "addState",
//	info: {
//		target: "module",
//		id: "cargobay",
//		state: "fire"
//	}
//});


// Спасатели миссии
mission.characters = {};
mission.characters.saver1 = {
	id: "saver1",
	name: "Чак Норрис",
	skills: {
		engineering: 5,
		medicine: 5,
		programming: 5,
		physics: 5
	},
	states: [],
	moduleId: "lifeboat",
	actionModuleId: "",
	actionId: "",
	stateId: ""
}

mission.characters.saver2 = {
	id: "saver2",
	name: "Брюс Виллис",
	skills: {
		engineering: 5,
		medicine: 5,
		programming: 5,
		physics: 5
	},
	states: [],
	moduleId: "lifeboat",
	actionModuleId: "",
	actionId: "",
	stateId: ""
}