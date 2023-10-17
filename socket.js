const socketIO = require('socket.io');

let io;

module.exports = {
  init: (httpServer) => {
    io = socketIO(httpServer);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.IO is not initialized.');
    }
    return io;
  },
};
