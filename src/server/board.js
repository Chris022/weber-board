const Constants = require('../shared/constants');

class Board {
  constructor(name) {
    this.sockets = {};
    this.users = {} //socked-id: {"name":, "permission":}
    this.lines = [];
    this.name = name;
  }

  addUser(io,socket,name) {
    this.sockets[socket.id] = socket;
    //check if there are still owensers in the chennal
    let hasOwner = Object.values(this.users).reduce((x,y) => x || y.permission == 1,false)
    //if not make the user owner
    this.users[socket.id] = {"name":name,"permission":hasOwner ? 0 : 1}
    io.to(this.name).emit(Constants.MSG_TYPES.USER_UPDATED,this.users)
    console.log("Added user " + JSON.stringify(Object.values(this.users)))
  }

  removeUser(io,socket) {
    delete this.sockets[socket.id];
    delete this.users[socket.id];
    io.to(this.name).emit(Constants.MSG_TYPES.USER_UPDATED,this.users);
    //check if there are still owensers in the chennal
    let hasOwner = Object.values(this.users).reduce((x,y) => x || y.permission == 1,false)
    if(!hasOwner){
      console.log("No owner left make user rnd user to owner")
      //make the first user to a owner
      if(Object.keys(this.users).length > 0){
        this.users[Object.keys(this.users)[0]].permission = 1;
      }
      io.to(this.name).emit(Constants.MSG_TYPES.USER_UPDATED,this.users);
    }
    console.log("Removed User" + socket.id)
  }

  changePermission(io,socket,permission, sockedId){
    console.log(this.users)
    if(this.users[socket.id]["permission"]==1){
      this.users[sockedId]["permission"] = permission%2;
      io.to(this.name).emit(Constants.MSG_TYPES.USER_UPDATED,this.users);
    }
  }

  handleDraw(socket, line,io) {
    if(this.users[socket.id]["permission"] == 1){
      console.log(socket.id + " Wants to draw " + line)
      this.lines.push(line);
      io.to(this.name).emit(Constants.MSG_TYPES.BOARD_UPDATE, {draw:[line],erase:[]});
    }
  }

  handleErase(socket, line,io){
    if(this.users[socket.id]["permission"] == 1){
      console.log(socket.id + " Wants to delete " + line)
      this.lines = this.lines.filter((l) => JSON.stringify(l)!=JSON.stringify(line))
      io.to(this.name).emit(Constants.MSG_TYPES.BOARD_UPDATE, {draw:[],erase:[line]});
    }
  }

  handleGetBoard(socket){
    socket.emit(Constants.MSG_TYPES.BOARD_UPDATE,{draw:this.lines,erase:[]})
    socket.emit(Constants.MSG_TYPES.USER_UPDATED,this.users);
  }
}

module.exports = Board;
