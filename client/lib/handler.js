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
		var room = rooms[actionInfo.roomId];
		var state = states[actionInfo.stateId];
		var action = actions[actionInfo.actionId];
	});
}