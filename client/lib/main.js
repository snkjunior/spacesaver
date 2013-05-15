var activeCharacterId = "";
var activeModuleId = "";

function main() {
	viewer.showMap(mission);
	return 1;
}

function getModuleActions(moduleId) {
	var moduleStates = mission.modules[moduleId].states;
	
	for (var i = 0; i < moduleStates.length; i++) {
		
	}
}