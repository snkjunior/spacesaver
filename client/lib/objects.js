//function Saver() {
//	this.x;
//	this.y;
//
//	this.engineering = 0;
//	this.saver = 0;
//	this.medic = 0;
//	this.leader = 0;
//}
//
//function Module(type, info) {
//	this.type = type;
//	this.info = info;
//}
//
//function Сasualties() {
//	this.x;
//	this.y;
//}
//
//function Mission() {
//	this.savers = {};
//	this.сasualties = {};
//	this.map = {};
//
//	this.actions = {};
//
//	this.Show = function() {
//		var map = $("#map");
//		map.html("");
//
//		var color;
//		var sprite;
//
//		for (var y in this.map) {
//			for (var x in this.map[y]) {
//				var module = this.map[y][x];
//				sprite = "";
//				color = "";
//
//				switch (module.type) {
//					case "Corridor":
//						//color = '#dddddd';
//						sprite = "cor" + module.info.type + ".png";
//						break;
//					case "Module":
//						//color = '#123456';
//						sprite = "module.png";
//						break;
//					case "Lifeboat":
//						//color = '#0000ff';
//						sprite = "lifeboat.png";
//						break;
//				}
//
//				var div = "<div style='left:"+(x*64)+"px; top: "+(y*64)+"px; width: 64px; height: 64px; position: absolute;' onmouseover='viewer.showModuleInfo("+x+", "+y+")'>";
//
//				if (module.info.personal != undefined && module.info.personal != 0) {
//					div += "<img src='image/player.png' style='position: absolute; left: 10px; top: 4px'>";
//				}
//
//				if (module.info.fireLevel != undefined && module.info.fireLevel != 0) {
//					div += "<img src='image/fire.png' style='position: absolute; left: 26px; top: 4px'>";
//				}
//				if (module.info.radiationLevel != undefined && module.info.radiationLevel != 0) {
//					div += "<img src='image/radiation.png' style='position: absolute; left: 42px; top: 4px'>";
//				}
//
//				div += "<img src='image/"+sprite+"'>";
//
//				div += "</div>";
//
//
//				map.append(div);
//
//
//			}
//		}
//	}
//}

function Character(id, name, job, skills, equipment) {
	this.id = id;
	this.name = name;
	this.job = job;
	this.skills = skills;
	this.equipment = equipment;
	this.moduleId;
	this.actionId;
}

function Action(id, name, skills, toStates, conditions) {
	this.id = id;
	this.name = name;
	this.skills = skills;
	this.toStates = toStates;
	this.conditions = conditions;
}

function Mission(modules, scripts) {
	this.modules = modules;
	this.scripts = scripts;
}

function Module(id, x, y, name, hp, states) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.name = name;
	this.hp = hp;
	this.states = states;

	this.isStateExists = function(stateId) {
		for (var i = 0; i < this.states.length; i++) {
			if(stateId == this.states[i]) {
				return true;
			}
		}
		return false;
	}

	this.removeState = function(stateId) {
		for (var i = 0; i < this.states.length; i++) {
			if(stateId == this.states[i]) {
				this.states.splice(i, 1);
			}
		}
		return;
	}

	this.addState = function(stateId) {
		this.states.push(stateId);
	}
}

function State(id, name, difficult, effects, actions) {
	this.id = id;
	this.name = name;
	this.difficult = difficult;
	this.effects = effects;
	this.actions = actions;
}