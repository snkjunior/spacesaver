var handler = {
	// Modules
	selectModule: function(moduleId) {
		if (activeModuleId != "") {
			viewer.unselectModule(activeModuleId);
		}
		activeModuleId = moduleId;
		viewer.selectModule(moduleId);
		viewer.showActiveModuleInfo();

		if (activeCharacterId != "") {
			viewer.showActions();
		}
	},

	mouseOverModule: function(moduleId) {
		if (moduleId != activeModuleId) {
			viewer.mouseOverModule(moduleId);
		}
		viewer.showModuleInfo(moduleId);
	},

	mouseOutModule: function(moduleId) {
		if (moduleId != activeModuleId) {
			viewer.mouseOutModule(moduleId);
		}
		viewer.showActiveModuleInfo();
	},


	// Characters
	selectCharacter: function(characterId) {
		if (activeCharacterId != "") {
			viewer.unselectCharacter(activeCharacterId);
		}
		activeCharacterId = characterId;
		viewer.selectCharacter(characterId);

		if (activeModuleId != "") {
			viewer.showActions();
		}
	},

	mouseOverCharacter: function(characterId) {
		if (characterId != activeCharacterId) {
			viewer.mouseOverCharacter(characterId);
		}
	},

	mouseOutCharacter: function(characterId) {
		if (characterId != activeCharacterId) {
			viewer.mouseOutCharacter(characterId);
		}
	},

	// Actions
	selectAction: function(actionId, stateId) {
		if (activeCharacterId == "" || activeModuleId == "") {
			return;
		}

		mission.characters[activeCharacterId].actionModuleId = activeModuleId;
		mission.characters[activeCharacterId].stateId = stateId;
		mission.characters[activeCharacterId].actionId = actionId;

		viewer.selectAction(activeCharacterId, activeModuleId, stateId, actionId);
		viewer.unselectModule(activeModuleId);
		viewer.unselectCharacter(activeCharacterId);
		viewer.clearInfoPanel();
		viewer.clearActionsPanel();

		activeCharacterId = "";
		activeModuleId = "";
	},

	mouseOverAction: function(actionId) {
		viewer.mouseOverAction(actionId);
	},

	mouseOutAction: function(actionId) {
		viewer.mouseOutAction(actionId);
	},
	
	endTurn: function() {
		turnResult = [];
		for (var characterId in mission.characters) {
			var character = mission.characters[characterId];
			if (character.actionModuleId != "" && character.stateId != "" && character.actionId != "") {
				controller.processAction(character);
				character.moduleId = character.actionModuleId;
				character.actionModuleId = "";
				character.actionId = "";
				character.statusId = "";
			}
		}

		turnResult.push("");

		for (var moduleId in mission.modules) {
			var module = mission.modules[moduleId];
			controller.processModuleStates(module);
		}

		viewer.clear()
		viewer.showMap();
		viewer.showCharacters();

		alert(turnResult.join("\n"));
	}
};