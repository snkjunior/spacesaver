var io = require('socket.io').listen(8725);
io.set('log level', 1);

var server = require('./lib/server').create(io.sockets.sockets);

io.sockets.on('connection', function(socket) {
    server.addNonAuthHandlersToSocket(socket);
});