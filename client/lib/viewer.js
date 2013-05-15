var viewer = {
	// Show mission map
	showMap: function() {
		var map = $("#map");
		map.html("");

		for (var moduleId in mission.modules) {
			var module = mission.modules[moduleId];
			var div = "<div id='module_"+moduleId+"' style='left:"+(module.x*64)+"px; top: "+(module.y*64)+"px; width: 60px; height: 60px; position: absolute; background-color: #aaaaaa; border: 2px ridge;' onmouseover='viewer.showModuleInfo(\""+module.id+"\")' onclick='handler.selectModule(\""+module.id+"\")' onmouseout='viewer.showActiveModuleInfo(\""+module.id+"\")'></div>";
			map.append(div);
		}
	},

	// Modules
	unselectModule: function(moduleId) {
		$("#module_"+moduleId).css("border-color", "");
	},

	selectModule: function(moduleId) {
		$("#module_"+moduleId).css("border-color", "#00ff00");		
	},

	showActiveModuleInfo: function() {
		if (activeModuleId != "") {
			this.showModuleInfo(activeModuleId);
		}
		else {
			this.clearInfoPanel();
		}
	},

	showModuleInfo: function(moduleId) {
		this.clearInfoPanel();
		var module = mission.modules[moduleId];
		$("#info").append("<div style='width:100%; text-align: center;'>"+module.name+"</div>");
		$("#info").append("<div style='width:100%; text-align: center;'><hr width='80%'></div>");

		$("#info").append("<div style='width:100%; text-align: center;'>Координаты:</div>");
		$("#info").append("<div style='width:100%; text-align: center;'>"+module.x+","+module.y+"</div>");

		$("#info").append("<br>");

		$("#info").append("<div style='width:100%; text-align: center;'>Структура:</div>");
		$("#info").append("<div style='width:100%; text-align: center;'>"+module.hp+"</div>");

		$("#info").append("<br>");

		$("#info").append("<div style='width:100%; text-align: center;'>Состояния:</div>");
		if (module.states.length != 0) {
			$.each(module.states, function(key, stateId) {
				$("#info").append("<div style='width:100%; text-align: center;'>"+states[stateId].name+"</div>");
			});
		}
		else {
			$("#info").append("<div style='width:100%; text-align: center;'>-</div>");
		}

		$("#info").append("<br>");
		$("#info").append("<div style='width:100%; text-align: center;'>Спасатели:</div>");

		charactersInModule = [];

		$.each(mission.characters, function(characterId, character) {
			if (character.moduleId == moduleId) {
				charactersInModule.push(characterId);
			}
		});

		if (charactersInModule.length != 0) {
			$.each(charactersInModule, function(value, characterId) {
				$("#info").append("<div style='width:100%; text-align: center;'>"+mission.characters[characterId].name+"</div>");
			});
		}
		else {
			$("#info").append("<div style='width:100%; text-align: center;'>-</div>");
		}
	},

	clearInfoPanel: function() {
		$("#info").html("");
	},

	// Characters
	showCharacterInfo: function(characterId) {
		this.clearInfoPanel();
	},

	selectCharacter: function(characterId) {
		
	},

	unselectChraracter: function(characterId) {

	}
}