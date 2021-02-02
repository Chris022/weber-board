const Constants = require('../shared/constants');

class Board {
  constructor() {
    this.sockets = {};
    this.lines = [];
    setInterval(this.update.bind(this), 1000 / 60);
  }

  addUser(socket) {
    this.sockets[socket.id] = socket;
    console.log("added user " + socket.id)
  }

  /*removePlayer(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }*/

  handleDraw(socket, line) {
    console.log(socket.id + " Wants to draw " + line)
    this.lines.push(line);
  }

  update() {
    // Update each player
    Object.keys(this.sockets).forEach(playerID => {
      const socket = this.sockets[playerID];
      socket.emit(Constants.MSG_TYPES.BOARD_UPDATE, this.lines);
    });
  }
}

module.exports = Board;
