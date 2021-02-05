import io from 'socket.io-client';
import { processBoardUpdate, processUserUpdate } from './state';
import { showErrorMsg } from './htmlController'

const Constants = require('../shared/constants');

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });
const connectedPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!');
    resolve();
  });
});

export const connect = () => (
  connectedPromise.then(() => {
    // Register callbacks
    socket.on(Constants.MSG_TYPES.BOARD_UPDATE, processBoardUpdate);
    socket.on(Constants.MSG_TYPES.USER_UPDATED,processUserUpdate);
    socket.on(Constants.MSG_TYPES.SERVER_ERROR, showErrorMsg)
    socket.on('disconnect', () => {
      console.log('Disconnected from server.');
    });
  })
);

export const draw = line => {
  socket.emit(Constants.MSG_TYPES.DRAW, line);
};

export const eraseLine = line => {
  socket.emit(Constants.MSG_TYPES.ERASE, line);
};

export const connectToRoom = (roomname,name) => {
  socket.emit(Constants.MSG_TYPES.CONNECT,roomname,name);
};

export const createRoom = (roomname,name) => {
  socket.emit(Constants.MSG_TYPES.CREATE_BOARD,roomname,name);
};

export const changePermission = (sockedId, permision) => {
  socket.emit(Constants.MSG_TYPES.SET_PERMISSION,permision,sockedId);
}