var viewer = {
	showMap: function() {
		var map = $("#map");
		map.html("");

		var sprite;

		for (var moduleId in mission.modules) {
			var module = mission.modules[moduleId];
			sprite = "module.png";
			var div = "<div style='left:"+(module.x*64)+"px; top: "+(module.y*64)+"px; width: 64px; height: 64px; position: absolute;' onmouseover='viewer.showModuleInfo(\""+module.id+"\")'>";
			div += "<img src='image/"+sprite+"'>";
			div += "</div>";

			map.append(div);
		}
	},

	showModuleInfo: function(moduleId) {
		this.clearInfoPanel();
		var module = mission.modules[moduleId];
		$("#info").append("<div style='width:100%; text-align: center;'>"+module.name+"</div>");
		$("#info").append("<div style='width:100%; text-align: center;'><hr width='80%'></div>");

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

		$.each(characters, function(characterId, character) {
			if (character.moduleId == moduleId) {
				charactersInModule.push(characterId);
			}
		});

		if (charactersInModule.length != 0) {
			$.each(charactersInModule, function(value, characterId) {
				$("#info").append("<div style='width:100%; text-align: center;'>"+characters[characterId].name+", "+characters[characterId].job+"</div>");
			});
		}
		else {
			$("#info").append("<div style='width:100%; text-align: center;'>-</div>");
		}

	},

	clearInfoPanel: function() {
		$("#info").html("");
	}
}