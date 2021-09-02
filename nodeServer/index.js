//const io = require('socket.io')(8000)
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
const user = {}
//io.on create the instance which listen for the connection
io.on('connection', socket => {
    //socket.on is when a connection wants to join
    //user-joined is the user made event
    socket.on('new-user-joined', name => {
        console.log("new user joined",name)
        user[socket.id]=name;
       
        socket.broadcast.emit('user-joined',name);
    });
    
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:user[socket.id]})
    });

    //when the user left the connection a 'disconnet' event is get fired
    socket.on('disconnect',message=>{
        socket.broadcast.emit('leave',{name:user[socket.id]});
        delete user[socket.id];
    });
})