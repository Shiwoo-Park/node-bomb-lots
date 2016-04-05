var dotenv = require('dotenv');
dotenv.load({path: '.env'});

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var session = require('express-session');

app.set('port', process.env.HTTP_PORT || 7000);
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/view/index.html');
});

io.on('connection', function (socket) {
    console.log('User connected');

    socket.on('chat', function (msg) {
        io.emit('chat', msg);
        console.log('message: ' + msg);
    });

    socket.on('disconnect', function () {
        console.log("User disconnected");
    })
});

http.listen(app.get('port'), function () {
    console.log("Node bomb game server started listening on %s", app.get('port'));
});