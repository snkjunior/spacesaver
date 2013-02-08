var Server = function(sockets) {
	this.users = {};
	this.sockets = sockets;
	this.database = require('./database');

	this.addNonAuthHandlersToSocket = function(socket) {
		require('./socketModules/login').connect(socket, this);
		require('./socketModules/registration').connect(socket, this);
	}

	this.addLoginHandlersToSocket = function(socket, userId) {
		//require('./socketModules/ping').connect(socket, this, userI);
		//require('./socketModules/createCharacter').connect(socket, this);
		//require('./socketModules/deleteCharacter').connect(socket, this);
		//require('./socketModules/chooseCharacter').connect(socket, this);
	}

	this.addInGameHandlersToSocket = function(socket, userId) {

	}

	this.userLogin = function(userId, socketId) {
		if (!this.users[userId]) {
			return;
		}

		this.users[userId] = {
			socketId: socketId,
			lastPingTime: Math.round(+new Date() / 1000),
			lastActionTime: Math.round(+new Date() / 1000)
		}

		return true;
	}
}

exports.create = function(sockets) {
	return new Server(sockets);
}

