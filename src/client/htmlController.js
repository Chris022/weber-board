import { changePermission } from './networking';
import { getUserName } from './state';

export function renderHTMLUserList(users){  //socked:id:{"name": , "permission": }
  document.getElementById("userpanel").innerHTML = "";
  let allowed = users[Object.keys(users).filter(id => users[id]["name"] == getUserName())[0]]["permission"] != 0
  Object.keys(users).forEach(userId => {
    let element = `<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>\
    <div class="dropdown">\
      <button onclick="${allowed ?  `toggleMenue('${userId}')` : ""}" class="dropbtn">${users[userId]["name"]}</button>\
      <div id="dropdown-${userId}" class="dropdown-content">\
        <a id="changeButton-${userId}">${users[userId]["permission"] == 0 ? "Make Admin" : "Make User"}</a>\
      </div>\
    </div><br>`;
    document.getElementById("userpanel").innerHTML += element;
  })
  Object.keys(users).forEach(userId => {
    document.getElementById("changeButton-"+userId).onclick = () => changePermission(userId,users[userId]["permission"] == 0 ? 1 : 0);
  })
}

export function showErrorMsg(msg){
  document.getElementById("error-alert").style.display = "block";
  document.getElementById("error-msg").innerHTML = msg;
}

export function getColor(){
  if(document.getElementById("colorPicker")){
    return document.getElementById("colorPicker").value;
  }
  return "#00000"
}