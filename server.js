const io = require("socket.io")(3000);

const users = {};

io.on("connection", socket => {
  // io.emit('broadcast', /* */); // emit an event to all connected sockets
  socket.on("new-user", function(name) {
    users[socket.id]=name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-message", function(data) {
    socket.broadcast.emit("chat-meeage", {data:data, name:users[socket.id]});
  }); // listen to the event
  socket.on("disconnect", function() {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  }); 
});
