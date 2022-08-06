/*****************WEB SOCKET*****************/
module.exports = (app) => {
  app.io.on('connection', function(socket) {
    console.log(`user ${socket.id} connected`);

    // join a room that is passed by the header of the connection
    socket.join(socket.handshake.headers.room);
    console.log(`user ${socket.id} joined the room ${socket.handshake.headers.room}`);

    // broadcast to everyone in the room the new user
    socket.to(socket.handshake.headers.room).emit('serverMessage', `User ${socket.handshake.headers.user} has joined the room`);

    // on disconnect
    socket.on('disconnect', (reason) => {
      console.log(`user ${socket.id} disconnected with reason: ${reason}`);
    });
  

    // user quit a room
    socket.on('quitRoom', function(userChat){
        // remove user from the given room
        socket.leave(userChat.roomChat);
        // broadcast to everyone in the room that user has left
        socket.to(userChat.roomChat).emit('serverMessage', `User ${userChat.user} has left the room`);
    });

    // recieve message sent from client
    socket.on('clientMessage', function(message){
      // broadcast message to everyone in the room
      socket.to(message.userChat.roomChat).emit('serverMessage', message);
    });
  });  
}