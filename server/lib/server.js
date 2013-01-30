var Server = function() {
    this.database = require('./database');
    this.sockets = sockets;
	this.users = {};
}

exports.create = function(sockets) {
    return new Server(sockets);
}
