<script lang="js">
  export default {
    data() {
      return {
        tasks: [],
        userName: ""
      }
    },
    mounted(){
      this.logIn();
    },
    methods:{
      createTask(){
        console.log("CT");
        let task = "";
        while(task.length > 15 || task.length < 1 || this.tasks.includes(task)) {
          task = prompt("Please enter a task name of at least one and up to 15 characters.", "");
          }
        let date = prompt("Enter future due date in format <MM/DD/YYYY>");
        while (!Date.parse(date) || Date.parse(date) < Date.now()) {
        date = prompt("Invalid date, Please use format <MM/DD/YYYY> in the future");
        }
        let progress = prompt("Enter completion percentage, value from 0 to 100");
        while (progress < 0 || progress > 100) {
          progress = prompt("Enter a value from 0 to 100");
        }
        let myObj = {"task": task, "date": date, "progress": progress};
        this.tasks.push(myObj);
        this.updateStorage();
      },

      editTask(index){
        console.log(index);
        let newTask = prompt("Please enter the new task name.")
        while(newTask.length > 15 || newTask.length < 1 || this.tasks.includes(newTask)) {
          newTask = prompt("Either that task already exists or is an invalid length. Enter again.", "");
          }
        this.tasks[index].task = newTask;  
        this.updateStorage();
      },
      editDate(index){
        let newDate = prompt("Enter future due date in format <MM/DD/YYYY>");
        while (!Date.parse(newDate) || Date.parse(newDate) < Date.now()) {
        date = prompt("Invalid date, Please use format <MM/DD/YYYY> in the future");
        }
        this.tasks[index].date = newDate;
        this.updateStorage();
      },
      editProgress(index){
        let newProgress = prompt("Enter completion percentage, value from 0 to 100");
        while (newProgress < 0 || newProgress > 100) {
          newProgress = prompt("Enter a value from 0 to 100");
        }
        this.tasks[index].progress = newProgress; 
        this.updateStorage();
      },
      logIn(){
        let tasks = null;
        this.userName = prompt('Please Enter Your Name to Sign In');
        console.log(this.userName);
        if (window.localStorage.getItem(this.userName)) {
          console.log(window.localStorage.getItem("vue"+this.userName));
          console.log(JSON.parse(window.localStorage.getItem("vue"+this.userName)));
          this.tasks = (JSON.parse(window.localStorage.getItem("vue"+this.userName)));
           
        }
        console.log(this.tasks);
      },
      updateStorage(){
        window.localStorage.setItem("vue"+this.userName, JSON.stringify(this.tasks));
      }
    }
  }
</script>

<template>
  <div id="description">
    <h1>To Do! Application</h1>
    <p>
      A demonstration of four Javascript client-side frameworks. This is Vue.
    </p>
  </div>
  <br />
  <button id="newtask" class="newtask" value="2" @click="createTask">
    New Task
  </button>
  <br /><br /><br />

  <table style="width: 100%">
    <tr id="r1" class="toprow">
      <td id="r1c1" height="50px" width="33.33%">
        <b>Task</b>
      </td>
      <td id="r1c2" height="50px" width="33.33%">
        <b>Due Date</b>
      </td>
      <td id="r1c3" height="50px" width="33.33%">
        <b>Progress</b>
      </td>
    </tr>

    <tr v-for="(t, index) in tasks" class="itemrow"
       v-bind:style="t.progress < 33 ? 'background-color:  #FFCCCB;' : t.progress <67 ? 'background-color: #00FFFF;' : 'background-color: #90EE90;'">
      <td  height="50px" width="33.33%" @click="editTask(index)">
        {{ t.task }}
      </td>
      <td id="date" height="50px" width="33.33%" @click="editDate(index)">
        {{ t.date }}
      </td>
      <td id="progress" height="50px" width="33.33%" @click="editProgress(index)">
        {{ t.progress }}
      </td>
    </tr>
  </table>
</template>

<style>
body {
  background-color: #f0ffff;
}
table,
th,
td {
  border: 1px solid black;
  text-align: center;
}
.toprow {
      background-color: #5F9EA0;
    }
    .itemrow {
      background-color: #00FFFF;
    }
#description {
  text-align: center;
}
/* Borrowed from getcssscan.com -> Dribbble */
.newtask {
  background-color: #a9a9a9;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: 'Haas Grot Text R Web', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin: 0;
  position: absolute;
  left: 50%;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
}
.newtask:hover,
.newtask:focus {
  background-color: #f082ac;
}
</style>
