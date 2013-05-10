var actions = {};

actions.extinguish_the_fire = {
	id: "extinguish_the_fire",
	name: "Тушить пожар",
	skills: ["engineering"],
	states: {
		ignition: [
			{
				difficult: 8,
				result: [
					{type: "moduleState", result: "no"}
				]
			}
		],
		fire: [
			{
				difficult: 12,
				result: [
					{type: "moduleState", result: "no"}
				]
			},
			{
				difficult: 8,
				result: [
					{type: "moduleState", result: "ignition"}
				]
			}
		]
	},
	conditions:	[]
};

actions.cure_personal = {
	id: "cure",
	name: "Лечить",
	skills: ["medic"],
	states: {
		personal_injured: [
			{
				difficult: 10,
				result: [
					{type: "moduleState", result: "no"}
				]
			}
		]
	},
	conditions: []
}

actions.start_evacuating = {
	id: "start_evacuating",
	name: "Начать эвакуацию",
	skills: [],
	states: {
		personal: [
			{
				difficult: 0,
				result: [
					{type: "saverState", result: "evacuating"},
					{type: "moduleState", result: "no"}
				]
			}
		]
	},
	conditions: [
		{type: "modulesNoState", value: "personal_injured"},
		{type: "modulesNoState", value: "fire"}
	]
}

actions.evacuate = {
	id: "evacuate",
	name: "Эвакуировать",
	skills: [],
	states: {
		evacuation_point: [
			{
				difficult: 0,
				result: [
					{type: "saverState", result: "no"},
					{type: "missionEvacuated", result: "1"}
				]
			}
		]
	},
	conditions: [
		{type: "saverState", value: "evacuating"}
	]
}