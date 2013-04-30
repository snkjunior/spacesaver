exports.connect = function(socket, server) {
	var sendResponse = function(data) {
		socket.emit('sRegistration', data);
	}

    var requestHandler = function(data) {
		if(!data || !data.login || !data.password || !data.repassword || !data.email
			|| data.login == '' || data.password == '' || data.repassword == '' || data.email == ''
		) {
			sendResponse({type: 'error', error: 'Data is missing'});
			return;
		}

		var login = data.login;
		var password = data.password;
		var repassword = data.repassword;
		var email = data.email;

		if (password != repassword) {
			sendResponse({type: 'error', error: 'Repassword does not match password'});
			return;
		}

		// Is user exists
		server.database.users.isUserExists(login, function(result) {
			if (result == true) {
				server.database.users.createNewUser(login, password, email, function(result) {
					if(result == true) {
						sendResponse({type: 'ok'});
					}
				})
			}
			else {
				sendResponse({type: 'error', error: 'User with such login already exists'});
			}
		});
    }

	socket.on('cRegistration', requestHandler);
}
