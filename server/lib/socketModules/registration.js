exports.connect = function(socket, server) {
	this.sendResponse = function(data) {
		socket.emit('sRegistration', data);
	}

    var requestHandler = function(data) {
		if(!data || !data.login || !data.password || !data.repassword || !data.email
			|| data.login == '' || data.password == '' || data.repassword == '' || data.email == ''
		) {
			this.sendResponse({type: 'error', error: 'Data is missing'});
		}

		var login = data.login;
		var password = data.password;
		var repassword = data.repassword;
		var email = data.email;

		if (password != repassword) {
			this.sendResponse({type: 'error', error: 'Repassword does not match password'});
		}

		// Is user exists
		server.database.users.isUserExists(login, function(result) {
			if (result == true) {
				server.database.users.createNewUser(login, password, email, function(result) {
					if(result == true) {
						this.sendResponse({type: 'ok'});
					}
				})
			}
			else {
				this.sendResponse({type: 'error', error: 'User with such login already exists'});
			}
		});
    }

	socket.on('cRegistration', requestHandler);
}
