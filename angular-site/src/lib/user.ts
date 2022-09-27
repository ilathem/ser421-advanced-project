import {Task} from "./task";

export class User {
  name: string|null = "";
  tasks:Task[] = new Array<Task>;
  constructor(){
    this.name = prompt("Hello! Please enter your name.","");
    this.tasks= new Array<Task>;
  }
}
export function saveUsersFunc(userList:User[]){
    console.log("saving users");
    let stringifiedUserList = JSON.stringify(userList);
    console.log(stringifiedUserList);
    window.localStorage.setItem("userList", stringifiedUserList);
}
export function  findUserFunc(userList:User[], user:User){
    for (let i = 0;i<userList.length;i++){
      if (userList[i].name==user.name){
          user = userList[i];
          return;
      }
    }
    userList.push(user);
    return;
  }

function loadUsersFunc(userList:User[]){
    console.log("loading users");
    let loadedUserList = window.localStorage.getItem('userList')||"[]";
    if((JSON.parse(loadedUserList).length>0)){
      userList = JSON.parse(loadedUserList);
    }
    console.log(loadedUserList); 
  }


