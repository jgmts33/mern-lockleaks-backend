import Server from 'socket.io';

let io = null;

const ioHanlder = (req, res) => {

  if (!io) {
    console.log('*First use, starting Socket.IO');
    io = new Server(res.socket.server);

    // Listen for connection events
    io.on('connection', (socket) => {
      console.log(`Socket ${socket.id} connected.`);

      // Listen for incoming messages and broadcast to all clients
      socket.on('message', (message) => {
        io.emit('message', message);
      });

      // Clean up the socket on disconnect
      socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`);
      });
    });
  }
  res.end();

}

export default { ioHanlder, io };