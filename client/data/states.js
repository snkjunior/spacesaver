var states = {};

states.ignition = {
	id: "ignition",
	name: "Возгорание",
	result: [
		{type: "moduleAddState", value: "fire"},
		{type: "moduleRemoveState", value: "ignition"},
	],
	actions: ["extinguish_the_fire"]
}

states.fire = {
	id: "fire",
	name: "Пожар",
	result: [
		{type: "moduleAddHp", value: "-1"},
	],
	actions: ["extinguish_the_fire"]
};

states.personal = {
	id: "personal",
	name: "Персонал",
	result: [],
	actions: ["start_evacuating"]
}

states.personal_injured = {
	id: "personal_injured",
	name: "Персонал ранен",
	result: [],
	actions: ["cure_personal"]
}

states.evacuation_point = {
	id: "evacuation_point",
	name: "Точка эвакуации",
	result: [],
	actions: ["evacuate"]
},

// Состояния персонажа
states.evacuating = {
	id: "evacuating",
	name: "Эвакуация персонала",
	result: [],
	actions: []
}