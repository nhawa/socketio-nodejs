const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8000",
        credentials: true
      }
});

io.on('connection', (socket) => {
  console.log('a user connected: ' + socket.id);
  socket.on('disconnect', () => {
    console.log('user '+socket.id+' disconnected');
  });

  socket.on('join-room', (room) => {
    console.log('user join room: ')
    console.log(room)
    socket.join(room)
    socket.emit("reply", "Joined room: "+room)
  });

  socket.on('chat', (msg) => {
    console.log('user chat: ')
    console.log(msg)
    //need handler to BE
    console.log('room')
    console.log(socket.rooms)
    socket.emit("reply", "Received your message: "+msg)
    socket.to("room").emit('reply',msg)
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});