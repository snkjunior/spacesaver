function Room(id, name, hp, states) {
	this.id = id;
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