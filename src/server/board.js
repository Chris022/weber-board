const Constants = require('../shared/constants');

class Board {
  constructor() {
    this.sockets = {};
    this.lines = [];
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
    Object.keys(this.sockets).forEach(playerID => {
      const socket = this.sockets[playerID];
      socket.emit(Constants.MSG_TYPES.BOARD_UPDATE, {draw:[line],erase:[]});
    });
  }

  handleErase(socket, line){
    console.log(socket.id + " Wants to delete " + line)
    this.lines = this.lines.filter((l) => JSON.stringify(l)!=JSON.stringify(line))
    Object.keys(this.sockets).forEach(playerID => {
      const socket = this.sockets[playerID];
      socket.emit(Constants.MSG_TYPES.BOARD_UPDATE, {draw:[],erase:[line]});
    });
  }

  handleGetBoard(socket){
    socket.emit(Constants.MSG_TYPES.BOARD_UPDATE,{draw:this.lines,erase:[]})
  }
}

module.exports = Board;
