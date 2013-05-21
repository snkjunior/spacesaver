var actions = {};

actions.extinguish_the_fire = {
	id: "extinguish_the_fire",
	name: "Тушить пожар",
	skills: ["engineering"],
	states: {
		ignition: [
			{
				difficult: 10,
				result: [
					{type: "moduleRemoveState", value: "ignition"}
				]
			}
		],
		fire: [
			{
				difficult: 15,
				result: [
					{type: "moduleRemoveState", value: "fire"}
				]
			},
			{
				difficult: 10,
				result: [
					{type: "moduleRemoveState", value: "fire"},
					{type: "moduleAddState", value: "ignition"}
				]
			}
		]
	},
	conditions:	[]
};

actions.cure_personal = {
	id: "cure_personal",
	name: "Лечить персонал",
	skills: ["medicine"],
	states: {
		personal_injured: [
			{
				difficult: 15,
				result: [
					{type: "moduleRemoveState", value: "personal_injured"}
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
					{type: "saverAddState", value: "evacuating"},
					{type: "moduleRemoveState", value: "personal"}
				]
			}
		]
	},
	conditions: [
		{type: "moduleNoState", value: "personal_injured"},
		{type: "moduleNoState", value: "fire"},
		{type: "saverNoState", value: "evacuating"}
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
					{type: "saverRemoveState", value: "evacuating"},
					{type: "missionEvacuated", value: ""}
				]
			}
		]
	},
	conditions: [
		{type: "saverState", value: "evacuating"}
	]
}