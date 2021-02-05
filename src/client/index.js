import { connect, createRoom, connectToRoom } from './networking';
import { startRendering, stopRendering } from './render';
import { startCapturingInput, stopCapturingInput } from './input';
import { renderHTMLUserList } from './htmlController';
import { setUserName } from './state';


// I'm using a tiny subset of Bootstrap here for convenience - there's some wasted CSS,
// but not much. In general, you should be careful using Bootstrap because it makes it
// easy to unnecessarily bloat your site.
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
