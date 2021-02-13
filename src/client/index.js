import { connect, createRoom, connectToRoom } from './networking';
import { startRendering, stopRendering } from './render';
import { startCapturingInput, stopCapturingInput } from './input';
import { setUserName } from './state';


import './css/bootstrap-reboot.css';
import './css/main.css';


window.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("createRoomButton").onclick = ()=>{
    var roomId = document.getElementById("roomId").value;
    var name = document.getElementById("name").value;
    if(roomId != "" && name != ""){
      newRoom(name,roomId)
      document.getElementById('myModal').style.display = "none";
    }
  };
  
  document.getElementById("joinRoomButton").onclick = ()=>{
    var roomId = document.getElementById("roomId").value;
    var name = document.getElementById("name").value;
    if(roomId != "" && name != ""){
      joinRoom(name,roomId)
      document.getElementById('myModal').style.display = "none";
    }
  };
});


function joinRoom(name,roomid){
  Promise.all([
    connect(),
  ]).then(() => {
    setUserName(name)
    connectToRoom(roomid,name);
    startCapturingInput();
    startRendering();
  }).catch(console.error);
}

function newRoom(name,roomid){
  Promise.all([
    connect(),
  ]).then(() => {
    setUserName(name)
    createRoom(roomid,name);
    startCapturingInput();
    startRendering();
  }).catch(console.error);
}
