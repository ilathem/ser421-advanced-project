
//task-row-component.ts

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task, setPctFunc, setNameFunc, setDateFunc} from '../../lib/task';
import { User, saveUsersFunc } from '../../lib/user';

@Component({
  selector: 'tr[app-task-row]',
  templateUrl: './task-row.component.html',
})

export class TaskRowComponent implements OnInit {  
@Input() task: Task;                              //Uses @Input directive to access task from parent          
@Input() userList:User[];                         //Uses @Input directive to access userList form parent
@Output() taskChange = new EventEmitter<Task>();  //Uses @Output directive to emit data to parent upon change
@Output() userListChange = new EventEmitter<User[]>();  //Uses @Output directive to emit data to parent upon change
@Output("saveUsersCompEmit") saveUsersCompEmit: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
  }
  sendData(){
    this.taskChange.emit(this.task);  
    this.userListChange.emit(this.userList);
    this.saveUsersCompEmit.emit();
    console.log("Sending data:" + this.task);
  }
  setPctComp(){
    setPctFunc(this.task);
  }
  setNameComp(){
    setNameFunc(this.task);
  }
  setDateComp(){
    setDateFunc(this.task);
  }
  saveUsersComp(){
    saveUsersFunc(this.userList);
  }

}

