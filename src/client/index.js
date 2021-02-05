import { connect, createRoom, connectToRoom } from './networking';
import { startRendering, stopRendering } from './render';
import { startCapturingInput, stopCapturingInput } from './input';
import { setUserName } from './state';


import './css/bootstrap-reboot.css';
import './css/main.css';



Promise.all([
  connect(),
]).then(() => {
  var roomName = prompt("Please input the room number:");
  var userName = prompt("Please input your user name:");
  setUserName(userName)
  createRoom(roomName,userName);
  startCapturingInput();
  startRendering();
}).catch(console.error);
