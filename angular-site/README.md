## Angular Tutorial 

### Step 1: Initialize Angular project with Angular CLI

1.a  Run `npm -i @angular/cli` to install the Angular Command Line Interface 

1.b  Run `ng new to-do  --minimal` to create new Angular application named `to-do`.

Your new Angular project will have the following structure 
```
//'tree -I 'node_modules'//
.
├── angular.json                 // Defaults for Angular CLI
├── package.json                 // Package dependecies (npm)
├── package-lock.json            // Info about installed packages
├── README.md                    // Readme
├── src                          // Source files for application
│   │
│   ├── lib                      // Library classes
│   ├── app                      // Component files for app logic
│   │   ├── app.component.ts     // Logic for root module
│   │   └── app.module.ts        // Defines root module
│   ├── assets                   // Images etc
│   ├── environments             // Build config options
│   │   ├── environment.prod.ts  // Default production configs
│   │   └── environment.ts       // Default configs
│   ├── favicon.ico              // Bookmark icon
│   ├── index.html               // Html entry point
│   ├── main.ts                  // Application entry point
│   ├── polyfills.ts             // Browser configuration files
│   └── styles.css               // Css for app
├── tsconfig.app.json            // Extended TypeScript config for app
└── tsconfig.json                // Typescript config file

```

### Step 2: Add basic application data models

There for this demo, there is one css file that can be added to `./src/styles.css`.  There are additionally two TypeScript classese for the User and Task classes required for this implementation's data model. 
Place these classes in a `./src/lib` directory. Place the css in the `app/styles.css` file. These classes will not be included directly in this tutorial.  The classes can be found at `github.com/chadNoliver/to-do`. Their API is intended to be self-describing and their inclusion directly in this tutorial should not be necessary, as the primary focus of this tutorial is to learn how to utilize Angular.  

### Step 3: Utilize Angular Components and Directives to Make Application Dynamic

This application will be composed of two Angular Components and two Angular Directives.  For the main application component, we will edit the `app.component.ts` as follows:


```
//'src/app/app-component.ts'//
import { Component } from '@angular/core';
import { Task } from "../lib/task";
import { User } from "../lib/user";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  user:User = new User();
  tasks: Task[] = new Array<Task>;
  userList:User[] =new Array<User>;
  newTask(){
    let task:Task = new Task();
    this.user.tasks.push(task);
    this.saveUsers();
  }
     
  ngOnInit(){
    this.user = new User();
    this.loadUsers();
    this.findUser();
  }

  findUser(){
    for (let i = 0;i<this.userList.length;i++){
      if (this.userList[i].name==this.user.name){
          this.user = this.userList[i];
          return;
      }
    }
    this.userList.push(this.user);
    return;
  }
  
  loadUsers(){
    console.log("loading users");
    
    let loadedUserList = window.localStorage.getItem('userList')||"[]";
    if(JSON.parse(loadedUserList).length>0){
      this.userList = JSON.parse(loadedUserList);
    }
    console.log(loadedUserList); 
  }

  saveUsers(){
    console.log("saving users");
    let stringifiedUserList = JSON.stringify(this.userList);
    console.log(stringifiedUserList);
    window.localStorage.setItem("userList", stringifiedUserList);
  }
}

```
3.2  Next we will create the HTML layout for this component.  This Html template will be called in every place that the `<app-component>` HTML tag is called. 

Notice the `*ngFor` directive.  This Angular Directive will create a new table row for each Task object in the in user.tasks array of our data model.  This is Angular's way of dynamicaly executing DOM manipulation.

```
//'src/app/app.component.html'//
<body>
        <div style="text-align:center;"></div>
        <br>
        <button id="newtask" (click)="newTask()">New Task</button>
        <br><br><br>
        <table style="width:100%">
            <tr class="toprow">
                <td>
                    <b>Task</b>
                </td>
                <td>
                    <b>Due Date</b>
                </td>
                <td>
                    <b>Progress</b>
                </td>
            </tr>
            <tr class="itemrow" app-task-row *ngFor="let task of user.tasks;
                index as i; trackBy: taskTrackByMethod"
                [task]="task" clickable></tr>
          </table>
    </body>
```


In this application, tasks will be displayed as rows in an html table.  In order to utilize Angular for making these Tasks interactive, a Task component will be created as a child of the default `app.component`.  These Task component rows can then be modified with Angular `Directives` to dynamically change features as users interact with the application.


### Step 4 Create new Angular component for to-do Tasks.

4.1  Generate new component.ts file.  
Run `ng g c task-row`.  This will add to your project tree's `./src/app` directory a new directory for the `task-row` component.  
Edit the generated `task-row.component.ts` file as follows:
Notice that this will incorporate the `tr[app-task-row]` selector.  This selector is called with the `*ngFor` Directive in order to dynamically generate this component.

```
//'src/app/task-row/task-row.component.ts'//

import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../lib/task';
@Component({
  selector: 'tr[app-task-row]',
  templateUrl: './task-row.component.html',
})

export class TaskRowComponent implements OnInit {
@Input() task:Task;
  constructor() {}
  ngOnInit(): void {
  }
}
```


4.2  Create Angular template for new task-row compponent.  
This is the HTML template will be inserted into the DOM upon each call from the Directive `ngFor` in the app/component.  Notice that `{{}}` brackets can be used in order to access data dynamically from the data model.  Also notice the new directive [ngClass] that will dynamically change the style of our templage based on the value of an object from our data model.  Finally, notice that `(click)` can be used in order to call methods from our data model from user interaction with this html template.

```
//'src/app/task-row/task-row.component.html'//

<td [ngClass]="{'green': task.pct>75,
    'red': task.pct<25}" (click)="task.setName()">

      {{task.name}}

  </td>
      
  <td [ngClass]="{'green': task.pct>75,
                  'red': task.pct<25}" (click)="task.setDate()">

      {{task.date}}

  </td>

   <td [ngClass]="{'green': task.pct>75,
                  'red': task.pct<25}" (click)="task.setPct()">
    {{task.pct}}

  </td>
```
### Step 5: Serve application 
Run `ng serve` in order to run this application from the command line as a locally-hosted application.  Congratulations, you have created your first Angular application.
