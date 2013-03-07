function selectCharacter(characterId) {
	activeCharacter = characters[characterId];
	show();
}

function unselectCharacter(characterId) {
	activeCharacter = null;
	show();
}

function setCharacterAction(characterId, roomId, stateId, actionId) {
	mission.charactersAction[characterId] = {
		roomId: roomId,
		stateId: stateId,
		actionId: actionId
	};
	unselectCharacter(characterId);
}

function turn() {
	$.each(mission.charactersAction, function(characterId, actionInfo) {
		var room = mission.rooms[actionInfo.roomId];
		var state = states[actionInfo.stateId];
		var action = actions[actionInfo.actionId];

		if(!room.isStateExists(state.id)) {
			return;
		}

		var difficult = action.toStates[state.id].difficult;
		var totalCharacterSkillsLevel = 0;
		$.each(action.skills, function(id, skillId) {
			totalCharacterSkillsLevel += characters[characterId].skills[skillId];
		})

		var isActionSuccess = false;
		var hit = 1 + parseInt(Math.random() * difficult);		
		if (hit <= totalCharacterSkillsLevel) {
			isActionSuccess = true;
		}

		if (isActionSuccess) {
			var newState = action.toStates[state.id].to;
			room.removeState(state.id);
			if (newState != 'no') {
				room.addState(newState);
			}
		}
	});
	mission.charactersAction = {};

	$.each(mission.rooms, function(roomId, room) {
		$.each(room.states, function(id, stateId) {
			var state = states[stateId];
			$.each(state.effects, function(effectId, effectValue) {
				switch(effectId) {
					case 'hp':
						room.hp -= effectValue;
						break;
					case 'newState':
						room.removeState(stateId);
						room.addState(effectValue);
						break;
				}
			})
		})
	})

	show();
}