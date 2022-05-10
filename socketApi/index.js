var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', function(socket){
    // console.log('user connected');

    socket.on("FSend", msg => {
        // console.log(`front-end: ${msg}`);
        io.emit("FReceive", msg);
    });
    
    socket.on('disconnect', () => {
        // console.log('user disconnected');
    });
});

// socketApi.sendNotification = function() {
//     io.sockets.emit('hello', {msg: 'Hello World!'});
// }

module.exports = socketApi;
