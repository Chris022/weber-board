import io from 'socket.io-client';
import { processBoardUpdate } from './state';

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
    socket.on('disconnect', () => {
      console.log('Disconnected from server.');
    });
  })
);

export const draw = line => {
  socket.emit(Constants.MSG_TYPES.DRAW, line);
};

export const play = username => {
  socket.emit(Constants.MSG_TYPES.CONNECT);
};