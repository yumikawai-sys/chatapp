const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
let numClient = 0;  //the number of current clients

//create our express web app
const app = express();

//handle a request from a client (browser)
app.get('/', (req, res) =>
{
    res.sendFile(`${__dirname}/chat.html`)
});

//prepare the express app to be used by socket IO
const httpServer = http.createServer(app).listen(3000);

//create the chat server
const io = socketIO(httpServer);

io.on('connection', (socket) => {
        
    socket.emit('welcome', 'Welcome from the Chat Server!!')

    //increase the number of current clients
    numClient++;
        
    //send the number of clients to all
    io.emit('numberofclients', numClient);

    //send current server-time to all
    setInterval(() => {
        const serverTime = new Date().toTimeString();
        io.emit('server-time', serverTime)
    }, 1000);

    //handle incoming message from a client
    socket.on('message', (message)=>{
        //send this message to everyone
        io.emit('message', message);
    })           

    //When disconnected
    socket.on('disconnect', ()=>
    {
        //decrease the number of current clients
        numClient--;
        //send the number of clients to all
        io.emit('numberofclients', numClient);
                
    })
});



