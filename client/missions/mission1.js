var mission = {};

// Название миссии
mission.name = "Mission 1";

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
	states: ["personal", "personal_injured"]
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
	name: "Спасательная шлюпка",
	states: ["evacuation_point"]
}

// Скрипты миссии
mission.scripts = [];
mission.scripts.push({
	turn: 2,
	type: "addState",
	info: {
		target: "module",
		id: "cargobay",
		state: "fire"
	}
});