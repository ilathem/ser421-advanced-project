// src/app/app.component.ts

import { Component } from '@angular/core';

import { Task } from "../lib/task";
import { User } from "../lib/user";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {                       
                                                          // instantiate objects to be modified and sent to child
  user:User = new User();
  tasks: Task[] = new Array<Task>;
  userList: User[] =new Array<User>;
  newTask(){
                                                          // newTask as called from .html file
    let task:Task = new Task();                           
    this.user.tasks.push(task);
    this.saveUsersComp();
  }
     
  ngOnInit(){
    this.loadUsersComp();
    this.findUserComp();
    this.saveUsersComp();
  }

  findUserComp(){
    for (let i = 0;i<this.userList.length;i++){
      if (this.userList[i].name==this.user.name){
          this.user = this.userList[i];
          return;
      }
    }
    this.userList.push(this.user);
    return;
  }

  loadUsersComp(){
    console.log("loading users");
    let loadedUserList = window.localStorage.getItem('userList')||"[]";
    if (loadedUserList =='undefined'){loadedUserList='[]'}
    let parsed = JSON.parse(loadedUserList);
    if(parsed.length>0 && (parsed!=undefined) && (parsed!="undefined")){
      this.userList = JSON.parse(loadedUserList);
    }
    console.log(loadedUserList); 
  }

  saveUsersComp(){
    console.log("saving users");
    let stringifiedUserList = JSON.stringify(this.userList);
    console.log(stringifiedUserList);
    window.localStorage.setItem("userList", stringifiedUserList);
  }

}

