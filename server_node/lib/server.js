var Server = function(sockets) {
	this.users = {};
	this.sockets = sockets;
	this.database = require('./database');

	this.addNonAuthHandlersToSocket = function(socket) {
		require('./socketModules/login').connect(socket, this);
		require('./socketModules/registration').connect(socket, this);
	}

	this.addLoginHandlersToSocket = function(socket, userId) {
		//require('./socketModules/ping').connect(socket, this, userId);
		//require('./socketModules/getCharactersList').connect(socket, this, userId);
		//require('./socketModules/createCharacter').connect(socket, this, userId);
		//require('./socketModules/deleteCharacter').connect(socket, this, userId);
		//require('./socketModules/chooseCharacter').connect(socket, this, userId);
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
	}
}

exports.create = function(sockets) {
	return new Server(sockets);
}

