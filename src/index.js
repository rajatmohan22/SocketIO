const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words')
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicDirectory = path.join(__dirname+'/public');
app.use(express.static(publicDirectory))

let count = 0; /// Every time a connection is made, we want to increment this value.

io.on('connection',(socket)=>{
    console.log("New connection made");
    socket.emit('sentMessage',"Welcome")
    socket.broadcast.emit('sentMessage',"New user has joined")

    socket.on('sentMessage',(message,ack)=>{
        const checkBad = new Filter()
        if (checkBad.isProfane(message)){
            return ack('Profanity not allowed')
        }
        io.emit('sentMessage',message)
        ack()
    });

    socket.on('disconnect',()=>{
        io.emit('sentMessage','A user has left the chat!')
       })

    socket.on('sendLocation',(location,ack2)=>{
        const {lat,long} = location
        io.emit('sendLocation',`https://maps.google.com/?q=${lat},${long}`)
        ack2()
    })


})
server.listen(3000,()=>{
    console.log("App serving on port 3000");
})