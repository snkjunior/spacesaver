var viewer = {
	// Show mission map
	showMap: function() {
		var map = $("#map");
		map.html("");

		for (var moduleId in mission.modules) {
			var module = mission.modules[moduleId];
			var div = "<div id='module_"+moduleId+"' style='left:"+(module.x*64)+"px; top: "+(module.y*64)+"px; width: 60px; height: 60px; position: absolute; background-color: #aaaaaa; border: 2px ridge;' onmouseover='handler.mouseOverModule(\""+module.id+"\")' onclick='handler.selectModule(\""+module.id+"\")' onmouseout='handler.mouseOutModule(\""+module.id+"\")'></div>";
			map.append(div);
		}
	},

	// Show mission characters
	showCharacters: function() {
		var count = 0;
		var charactersBlock = $("#characters");
		charactersBlock.html("");
		$.each(mission.characters, function(characterId, character) {
			var div = "<div id='character_"+characterId+"' style='left: 10px; top: "+(135 * count)+"px; position: absolute; border: 2px ridge; width: 180px; height: 120px; background-color: #aaaaaa;' onmouseover='handler.mouseOverCharacter(\""+characterId+"\")' onclick='handler.selectCharacter(\""+characterId+"\")' onmouseout='handler.mouseOutCharacter(\""+characterId+"\")'>";
			div += "<div style='text-align: center;'>"+character.name+"</div>";
			div += "<div style='text-align: center; font-size: 10px;'>Мед:"+character.skills.medicine+" Инж:"+character.skills.engineering+" Про:"+character.skills.programming+" Физ:"+character.skills.physics+"</div>";

			var characterStates = [];
			$.each(character.states, function(id, stateId) {
				characterStates.push(states[stateId].name);
			});

			div += "<div style='text-align: center; font-size: 10px;'>Состояния: <span id='character_"+characterId+"_states'>"+(characterStates.length ? characterStates.join(", ") : '-')+"</span></div>";
			div += "<br>";
			div += "<div style='text-align: center; font-size: 10px;'>Модуль: <span id='character_"+characterId+"_module'>-</span></div>";
			div += "<div style='text-align: center; font-size: 10px;'>Состояние: <span id='character_"+characterId+"_state'>-</span></div>";
			div += "<div style='text-align: center; font-size: 10px;'>Действие: <span id='character_"+characterId+"_action'>-</span></div>";
			div += "</div>";
			charactersBlock.append(div);
			
			count++;
		});
	},

	// Show active character actions in active module
	showActions: function() {
		var stateActionsList = controller.getModuleActionsByStates(activeModuleId, activeCharacterId);
		var actionsBlock = $("#actions");
		actionsBlock.html("");
		$.each(stateActionsList, function(id, stateActions) {
			if (stateActions.actions.length) {
				var div = "<div style='width: 90%; text-align: center'>"+states[stateActions.stateId].name+"</div>";
				$.each(stateActions.actions, function(id, actionId) {
					div += "<div id='action_"+actionId+"' style='text-align:center; width: 90%; border: 2px ridge; background-color: #aaaaaa' onmouseover='handler.mouseOverAction(\""+actionId+"\")' onclick='handler.selectAction(\""+actionId+"\", \""+stateActions.stateId+"\")' onmouseout='handler.mouseOutAction(\""+actionId+"\")'>";
					div += actions[actionId].name;
					div += "</div>"
				})
				div += "<br>"
				actionsBlock.append(div);
			}
		});
	},

	// Modules
	unselectModule: function(moduleId) {
		$("#module_"+moduleId).css("background-color", "#aaaaaa");
	},

	mouseOverModule: function(moduleId) {
		$("#module_"+moduleId).css("background-color", "#ffff00");
		$("#module_"+moduleId).css("cursor", "pointer");
	},

	mouseOutModule: function(moduleId) {
		$("#module_"+moduleId).css("background-color", "#aaaaaa");
		$("#module_"+moduleId).css("cursor", "default");
	},

	selectModule: function(moduleId) {
		$("#module_"+moduleId).css("background-color", "#00ff00");
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
	selectCharacter: function(characterId) {
		$("#character_" + characterId).css('background-color', '#00ff00');
	},

	mouseOverCharacter: function(characterId) {
		$("#character_" + characterId).css('background-color', '#ffff00');
		$("#character_" + characterId).css("cursor", "pointer");
	},

	mouseOutCharacter: function(characterId) {
		$("#character_" + characterId).css('background-color', '#aaaaaa');
		$("#character_" + characterId).css("cursor", "default");
	},

	unselectCharacter: function(characterId) {
		$("#character_" + characterId).css('background-color', '#aaaaaa');
	},

	//Actions
	selectAction: function(characterId, moduleId, stateId, actionId) {
		$("#character_" + characterId + "_module").html(mission.modules[moduleId].name);
		$("#character_" + characterId + "_state").html(states[stateId].name);
		$("#character_" + characterId + "_action").html(actions[actionId].name);
	},

	mouseOverAction: function(actionId) {
		$("#action_" + actionId).css("background-color", "#ffff00");
		$("#action_" + actionId).css("cursor", "pointer");
	},

	mouseOutAction: function(actionId) {
		$("#action_" + actionId).css("background-color", "#aaaaaa");
		$("#action_" + actionId).css("cursor", "default");
	},

	clearActionsPanel: function() {
		$('#actions').html("");
	},
}