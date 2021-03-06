const roomController = {

  /**
   * User joins a Room (e.g. Javascript)
   */
  join: (io, socket, payload) => {
    const { roomName } = payload;
    const room = `/room/${roomName}`;
    console.log(`User joined ${roomName}`);
    socket.join(room);
  },
  /**
   * User leaves a Room (e.g. Javascript)
   */
  leave: (io, socket, payload) => {
    const { roomName } = payload;
    const room = `/room/${roomName}`;
    console.log(`User left ${roomName}`);
    socket.leave(room);
  },

};

module.exports = roomController;