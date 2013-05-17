var controller = {
	getModuleActionsByStates: function(moduleId, characterId) {
		var moduleActions = [];
		var module = mission.modules[moduleId];
		$.each(module.states, function(id, stateId) {
			var state = states[stateId];
			moduleStateActions = {
				stateId: stateId,
				actions: []
			};
			$.each(state.actions, function(id, actionId) {
				var action = actions[actionId];
				
				// Проверям выполняются ли условия активности действия
				var isActionActive = true;
				$.each(action.conditions, function(id, condition) {
					switch(condition.type) {
						case 'moduleState':
							var isStateExists = false;
							$.each(module.states, function(id, stateId) {
								if (stateId == condition.value) {
									isStateExists = true;
								}
							});

							if (!isStateExists) {
								isActionActive = false;
							}
							break;
						case 'moduleNoState':
							$.each(module.states, function(id, stateId) {
								if (stateId == condition.value) {
									isActionActive = false;
								}
							});
							break;
						case 'saverState':
							var isStateExists = false;
							$.each(mission.characters[characterId].states, function(id, stateId) {
								if (stateId == condition.value) {
									isStateExists = true;
								}
							});

							if (!isStateExists) {
								isActionActive = false;
							}
							break;
						case 'saverNoState':
							$.each(mission.characters[characterId].states, function(id, stateId) {
								if (stateId == condition.value) {
									isActionActive = false;
								}
							});

					}
				});

				if (isActionActive) {
					moduleStateActions.actions.push(action.id);
				}
			});
			moduleActions.push(moduleStateActions);
		});
		
		return moduleActions;
	},

	processAction: function(character) {
		var module = mission.modules[character.actionModuleId];
		var action = actions[character.actionId];
		var state = states[character.stateId];

		var randomRoll = this.getRandomInt(1, 20);
		var bonus = 0;

		$.each(action.skills, function(id, skillName) {
			bonus += character.skills[skillName];
		});

		var skillRoll = randomRoll + bonus;

		var isActionSuccess = false;
		$.each(action.states[state.id], function(id, info) {
			if (!isActionSuccess && skillRoll > info.difficult) {
				turnResult.push(character.name + " успешно выполнил действие '" + action.name + "' в модуле '" + module.name + "'. В итоге:");
				$.each(info.result, function(id, result) {
					switch (result.type) {
						case "moduleRemoveState":
							$.each(module.states, function(id, moduleStateId) {
								if (moduleStateId == result.value) {
									module.states.splice(id, 1);
								}
							});
							turnResult.push("  - модуль '"+module.name+"' потерял статус '" + states[result.value].name + "'");
							break;
						case "moduleAddState":
							module.states.push(result.value);
							turnResult.push("  - модуль '"+module.name+"' получил статус '" + states[result.value].name + "'");
							break;
						case "saverRemoveState":
							$.each(character.states, function(id, characterStateId) {
								if (characterStateId == result.value) {
									character.states.splice(id, 1);
								}
							});
							turnResult.push("  - персонаж потерял статус '" + states[result.value].name + "'");
							break;
						case "saverAddState":
							character.states.push(result.value);
							turnResult.push("  - персонаж получил статус '" + states[result.value].name + "'");
							break;
					}
				});
				isActionSuccess = true;
			}
		});

		if (!isActionSuccess) {
			turnResult.push(character.name + " провалил действие '" + action.name + "' в модуле '" + module.name + "'.");
		}

		return isActionSuccess;
	},

	processModuleStates: function(module) {
		$.each(module.states, function(id, stateId) {
			var state = states[stateId];
			if (state.result.length) {
				turnResult.push("Состояние '" + state.name + "' в модуле '" + module.name + "' приводит к следующим последствиям:");
				$.each(state.result, function(id, result) {
					switch (result.type) {
						case "moduleRemoveState":
							$.each(module.states, function(id, moduleStateId) {
								if (moduleStateId == result.value) {
									module.states.splice(id, 1);
								}
							});
							turnResult.push("  - модуль '"+module.name+"' потерял статус '" + result.value + "'");
							break;
						case "moduleAddState":
							module.states.push(result.value);
							turnResult.push("  - модуль '"+module.name+"' получил статус '" + result.value + "'");
							break;
						case "moduleAddHp":
							module.hp += parseInt(result.value)
							turnResult.push("  - изменилась структура модуля '"+module.name+"' на " + result.value + "; текущая структура модуля: " + module.hp);
					}
				});
			}
		});
	},

	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
};

