const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');

const Constants = require('../shared/constants');
const BoardCollection = require('./boardCollection');
const webpackConfig = require('../../webpack.dev.js');

// Setup an Express server
const app = express();
app.use(express.static('public'));


if (process.env.NODE_ENV === 'development') {
  // Setup Webpack for development
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // Static serve the dist/ folder in production
  app.use(express.static('dist'));
}


// Listen on port
const port = 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

// Setup socket.io
const io = socketio(server);

// Setup the Board
const boards = new BoardCollection();

// Listen for socket.io connections
io.on('connection', socket => {
  socket.on(Constants.MSG_TYPES.CREATE_BOARD, handleCreateBoard)
  socket.on(Constants.MSG_TYPES.CONNECT, handleAddUser)
  socket.on(Constants.MSG_TYPES.DRAW, handleDraw);
  socket.on(Constants.MSG_TYPES.ERASE, handleErase);
  socket.on(Constants.MSG_TYPES.GET_BOARD, handleGetBoard);
  socket.on(Constants.MSG_TYPES.SET_PERMISSION, handelSetPermission)
  socket.on('disconnect', onDisconnect);
});

function handelSetPermission(permission,socketId){
  let board = boards.getRoomById(this.id);
  if(board){
    board.changePermission(io,this,permission,socketId);
  }
}

function handleCreateBoard(roomName,name) {
  let succes = boards.createNewRoom(roomName);
  let board = boards.getRoomByName(roomName);
  if(board && succes){
    this.join(roomName)
    board.addUser(io,this,name,succes)
    board.handleGetBoard(this)
  }else{
    this.emit(Constants.MSG_TYPES.SERVER_ERROR, "Can't create Room. Name already in Use")
  }
}

function handleDraw(line) {
  let board = boards.getRoomById(this.id);
  if(board){
    board.handleDraw(this, line,io);
  }
  else{
    this.emit(Constants.MSG_TYPES.SERVER_ERROR, "Server Error")
  }
}

function handleErase(line){
  let board = boards.getRoomById(this.id);
  if(board){
    board.handleErase(this,line,io)
  }else{
    this.emit(Constants.MSG_TYPES.SERVER_ERROR, "Server Error")
  }
}

function handleGetBoard() {
  let board = boards.getRoomById(this.id);
  if(board){
    board.handleGetBoard(this);
  }else{
    this.emit(Constants.MSG_TYPES.SERVER_ERROR, "Server Error")
  }
}

function onDisconnect(){
  let board = boards.getRoomById(this.id)
  if(board){
    board.removeUser(io,this);
  }else{
    this.emit(Constants.MSG_TYPES.SERVER_ERROR, "Server Error")
  }
}

function handleAddUser(roomName,name){
  let board = boards.getRoomByName(roomName);
  if(board){
    this.join(roomName) //make the socke join the room
    board.addUser(io,this,name)
    board.handleGetBoard(this)
  }else{
    this.emit(Constants.MSG_TYPES.SERVER_ERROR, "Server Error: Most likely the RoomName is wrong")
  }
}
