var states = {};

states.ignition = {
	id: "ignition",
	name: "Возгорание",
	result: {
		newState: "fire"
	},
	actions: ["extinguish_the_fire"]
}

states.fire = {
	id: "fire",
	name: "Пожар",
	result: {
		hp: -1
	},
	actions: ["extinguish_the_fire"]
};

states.personal = {
	id: "personal",
	name: "Персонал",
	result: {},
	actions: ["startEvacuating"]
}

states.personal_injured = {
	id: "personal_injured",
	name: "Персонал ранен",
	result: {},
	actions: ["cure"]
}

states.evacuation_point = {
	id: "evacuation_point",
	name: "Точка эвакуации",
	result: {},
	actions: ["evacuate"]
}