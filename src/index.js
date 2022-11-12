const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words')
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const messageFunc = require('./utils/messages')
const moment = require('moment');
const locationFunc = require('./utils/locationFunc');
const {addUser,removeUser,getUser,getUsersInRoom} = require('./utils/users')

const publicDirectory = path.join(__dirname+'/public');
app.use(express.static(publicDirectory))

io.on('connection',(socket)=>{
    console.log("New connection made");

    socket.on('join',({username,chat_room},callback)=>{

        const {error,newUser}=addUser({id:socket.id,username,chat_room}) // Order of error and user doesnt matter here.

        // console.log(user)
        if(error){
            return callback(error)
        }

        console.log(newUser)
        socket.join(chat_room)
        
        socket.emit('sentMessage',messageFunc(`Welcome to ${newUser.chat_room}`))
        socket.broadcast.to(chat_room).emit('sentMessage',messageFunc(`${newUser.username} has joined the chat`))
        callback()
    
    })
    
    socket.on('sentMessage',(message,ack)=>{

        console.log(socket.id)

        const newUser = getUser(socket.id)
        console.log(newUser)
        const modifiedMessage = messageFunc(message)
        const checkBad = new Filter()
        if (checkBad.isProfane(modifiedMessage.text)){
            return ack('Profanity not allowed')
        }
        io.to(newUser.chat_room).emit('sentMessage',modifiedMessage)
        ack()
    });

    socket.on('disconnect',()=>{

        const user =  removeUser(socket.id)

        if(user){
            io.to(user.chat_room).emit('sentMessage',messageFunc(`${user.username} left`))
        }

       })

    socket.on('sendLocation',(location,ack2)=>{
        console.log(location)
        const {lat,long} = location

        io.emit('sendLocation',locationFunc(`https://maps.google.com/?q=${lat},${long}`))
        ack2()
    })
})

// socket.on('join',(input)=>{
//     const {username,chat_room} = input

// }) Could do this, but you could also destructure it in the arguments itself.


server.listen(3000,()=>{
    console.log("App serving on port 3000");
})