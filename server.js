const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

//create our express web app
const app = express();

//handle a request from a client (browser)
app.get('/', (req, res) =>
{
    res.send("hello")
    res.sendFile(`${__dirname/chat.html}`)
});

//prepare the express app to be used by socket IO
const httpServer = http.createServer(app).listen(3000);

//create the chat server
const io = socketIO(httpServer);

//capturing the connection event...when a client connects
io.on('connection', socket => {
    console.log('client connected...!')
    socket.emit('welcome', 'Welcome to the chat server!!')

    socket.on('disconnect', ()=>
    {
        console.log('Client Disconnected')
    })

});
