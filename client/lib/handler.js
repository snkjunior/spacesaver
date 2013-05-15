var handler = {
	selectModule: function(moduleId) {
		if (activeModuleId != "") {
			viewer.unselectModule(activeModuleId);
		}
		activeModuleId = moduleId;
		viewer.selectModule(moduleId);
		viewer.showActiveModuleInfo();
	},

	selectCharacter: function(characterId) {
		activeCharacterId = characterId;
		viewer.selectCharacter(characterId);
	}
};