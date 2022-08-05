const rooms = [];

/*****************WEB SOCKET*****************/
module.exports = (app) => {
  app.io.on('connection', function(socket) {
    console.log(`user ${socket.id} connected`);
    
    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected`);
    });
  

    // receive user's request for joining a room 
    socket.on('joinRoom', function(roomChat){
        socket.join(roomChat);
    });

    // recieve message sent from client
    socket.on('sendMessage', function(message){
      
    });
  });  
}