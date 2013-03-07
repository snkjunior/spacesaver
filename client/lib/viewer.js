function show() {
	$('#charactersPanel').html('');
	$('#actionPanel').html('');
	$('#infoPanel').html('');

	for (var characterId in characters) {
		$('#charactersPanel').append(formCharacterDiv(characters[characterId]));
	}

	for (var roomId in mission.rooms) {
		var room = mission.rooms[roomId];
		$('#infoPanel').append(formRoomInfoDiv(room));

		if(room.states.length) {
			for (var i = 0; i < room.states.length; i++) {
				var state = states[room.states[i]];
				for (var j = 0; j < state.actions.length; j++) {
					var action = actions[state.actions[j]];
					var isConditions = true;
					$.each(action.conditions, function(id, actionStateId) {
						isConditionExist = false;
						$.each(room.states, function(id, roomStateId) {
							if(actionStateId == roomStateId) {
								isConditionExist = true;
							}
						})

						if(!isConditionExist) {
							isConditions = false;
						}
					});

					if(isConditions) {
						$('#actionPanel').append(formActionDiv(room, state, action));
					}
				}
			}
		}
	}
}

function formRoomInfoDiv(room) {
	var div = '<div><div><b>' + room.name + '</b> ';
	if (room.states.length == 0) {
		div += '<div>-</div>';
	}
	else {
		$.each(room.states, function(id, stateId) {
			div += '<div>'+states[stateId].name+'</div>';
		})
	}
	div += '<div style="height: 10px;"></div></div>';
	return div;
}

function formActionDiv(room, state, action) {
	var params = '';
	if (activeCharacter != null) {
		params = 'style="background-color: #dddddd" onclick="setCharacterAction(\''+activeCharacter.id+'\', \''+room.id+'\', \''+state.id+'\', \''+action.id+'\')" onmouseover="this.setAttribute(\'style\', \'background-color: #ffff00; cursor: pointer\')" onmouseout="this.setAttribute(\'style\', \'background-color: #dddddd\')"';
	}
	var div = '<div ' + params + '><b>' + room.name + '</b>: ' + action.name + ' на "' + state.name + '"(' + action.skills.join(',') + ') - ' + action.toStates[state.id].no + ((Object.keys(action.toStates[state.id]).length > 1) ? '*' : '') + ' </div>';
	return div;
}

function formCharacterDiv(character) {
	var div;
	if(activeCharacter != null && activeCharacter == character) {
		div = '<div style="background-color: #00ff00; cursor: pointer" onclick="unselectCharacter(\''+character.id+'\')"><div><b>' + character.name + '</b></div>';
	}
	else {
		div = '<div style="background-color: #dddddd" onclick="selectCharacter(\''+character.id+'\')" onmouseover="this.setAttribute(\'style\', \'background-color: #ffff00; cursor: pointer\')" onmouseout="this.setAttribute(\'style\', \'background-color: #dddddd\')"><div><b>' + character.name + '</b></div>';
	}
	div += '<div>  профессия: ' + character.job + ' </div>';
	div += '<div>  инженерия: ' + character.skills.engineering + ' </div>';
	div += '<div>  медицина: ' + character.skills.medicine + ' </div>';
	div += '<div>  программирование: ' + character.skills.programming + ' </div>';
	div += '<div>  физика: ' + character.skills.physics + ' </div>';
	var actionName = '-';
	var actionRoom = '-';
	var actionState = '-';
	if (mission.charactersAction[character.id]) {
		var characterAction = mission.charactersAction[character.id];
		actionName = actions[characterAction.actionId].name;
		actionRoom = mission.rooms[characterAction.roomId].name;
		actionState = states[characterAction.stateId].name;
	}
	div += '<div>  задание: ' + actionName + ' </div>';
	div += '<div>  цель: ' + actionRoom + ' </div>';
	div += '<div>  проблема: ' + actionState + ' </div>';
	div += '</div>';	
	return div;
}