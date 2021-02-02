const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');

const Constants = require('../shared/constants');
const Board = require('./board');
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
const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

// Setup socket.io
const io = socketio(server);

// Setup the Board
const board = new Board();

// Listen for socket.io connections
io.on('connection', socket => {
  console.log('Player connected!', socket.id);
  board.addUser(socket)

  socket.on(Constants.MSG_TYPES.DRAW, handleDraw);
  socket.on(Constants.MSG_TYPES.ERASE, handleErase);
  socket.on(Constants.MSG_TYPES.GET_BOARD, handleGetBoard);
  //socket.on('disconnect', onDisconnect);
});



function handleDraw(line) {
  board.handleDraw(this, line);
}
function handleErase(line){
  board.handleErase(this,line)
}

function handleGetBoard() {
  board.handleGetBoard(this);
}

function handeAddUser(){
  console.log("hasldfads")
  board.addUser(this)
}
