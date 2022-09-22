import react, { useState, useEffect } from 'react';
import './todo.css'

export default function ReactDemo() {

  
  // state for storing array of all todo items
  const [todos, setTodos] = useState([]);
  // state for storing current todo item
  const [currentTodoTitle, setCurrentTodoTitle] = useState('')
  const [currentTodoDate, setCurrentTodoDate] = useState('')
  const [currentTodoPercent, setCurrentTodoPercent] = useState('')

  // upon component mount, load todos for that user (if any)
  useEffect(() => {
    if (window.localStorage.getItem("todos"))
      setTodos(JSON.parse(window.localStorage.getItem("todos")))
  }, [])

  // when state changes, update the localstorage and todo array
  


  // Enter a new task
  function newTask() {
    var r = document.getElementById("newtask").value;

    var taskCell = document.getElementById("r" + r + "c1");
    var dateCell = document.getElementById("r" + r + "c2");
    var progressCell = document.getElementById("r" + r + "c3");

    var task = prompt("Please enter a task name of at least one and up to 15 characters.", "");
    while(task.length > 15 || task.length < 1) {
        task = prompt("Please enter a task name of at least one and up to 15 characters.", "");
    }

    var date = prompt("Please enter a future due date in the format 'MM/DD/YYYY'.", "");
    var today = getCurrentDate();

    /* console.log("Date: " + date);
    console.log("Today: " + today); */

    var comp = compareDates(date, today);
    console.log("Comp: " + comp);
    while(!checkIfDate(date) || !comp) {
        date = prompt("Please enter a future due date in the format 'MM/DD/YYYY'.", "");
        comp = compareDates(date, today);
    }

    var progress = prompt("Please enter the progress completion percentage.", "");
    while(!checkIfPercent(progress)) {
        progress = prompt("Please enter the completion percentage from 0 to 100.", "");
    }

    taskCell.innerHTML = task;
    dateCell.innerHTML = date;
    progressCell.innerHTML = progress + "%";
    colorCode(parseInt(r), progress);

    // update state
    setCurrentTodoTitle(task)
    setCurrentTodoDate(date)
    setCurrentTodoPercent(progress)

    r = parseInt(r) + 1;
    document.getElementById("newtask").value = r;
  }

  // Confirm submission is an appropriately-styled date
  function checkIfDate(x) {
    if(x.length != 10) {
        return false;
    }

    if(x.charAt(0) != "0" && x.charAt(0) != "1") {
        return false;
    }

    if(!Number.isInteger(parseInt(x.charAt(1)))) {
        return false;
    }

    if(x.charAt(2) != "/") {
        return false;
    }

    if(x.charAt(3) != "0" && x.charAt(3) != "1" && x.charAt(3) != "2" && x.charAt(3) != "3") {
        return false;
    }

    if(!Number.isInteger(parseInt(x.charAt(4)))) {
        return false;
    }

    if(x.charAt(5) != "/") {
        return false;
    }

    if(!Number.isInteger(parseInt(x.charAt(6)))) {
        return false;
    }

    if(!Number.isInteger(parseInt(x.charAt(7)))) {
        return false;
    }

    if(!Number.isInteger(parseInt(x.charAt(8)))) {
        return false;
    }

    if(!Number.isInteger(parseInt(x.charAt(9)))) {
        return false;
    }

    return true;
  }

  // Get today's date
  function getCurrentDate() {
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();

    today = month + "/" + day + "/" + year;

    return today;
    console.log("Today: " + today);
  }

  // Compare dates - needs work
  function compareDates(x, y) {
    var entYear = parseInt(x.substring(6));
    var entMonth = parseInt(x.substring(0));
    var entDay = parseInt(x.substring(3));
    
    /* console.log(entYear);
    console.log(entMonth);
    console.log(entDay); */

    var currYear = parseInt(y.substring(6));
    var currMonth = parseInt(y.substring(0));
    var currDay = parseInt(y.substring(3));

    /* console.log(currYear);
    console.log(currMonth);
    console.log(currDay); */

    if(entYear < currYear) {
        return false;
    } else if(entMonth < currMonth && entYear === currYear) {
        return false;
    } else if(entDay < currDay && entMonth === currMonth && entYear === currYear) {
        return false;
    } else {
        return true;
    }
  }

  // Confirm submission is a percentage
  function checkIfPercent(x) {
    if(!Number.isInteger(parseInt(x))) {
        return false;
    }

    if(x > 100 || x < 0) {
        return false;
    }

    return true;
  }

  // Edit a task
  function editTask(r, c) {
    var taskCell = document.getElementById("r" + r + "c" + c);

    if(taskCell.innerHTML.length < 1) {
        return;
    }

    var newTaskName = prompt("Please enter a new task name of at least one and up to 15 characters.", ""); 
    while(newTaskName.length > 15 || newTaskName.length < 1) {
        newTaskName = prompt("Please enter a new task name of at least one and up to 15 characters.", ""); 
    }

    taskCell.innerHTML = newTaskName;
  }

  // Edit a date
  function editDate(r, c) {
    var dateCell = document.getElementById("r" + r + "c" + c);

    if(dateCell.innerHTML.length < 1) {
        return;
    }

    var newDate = prompt("Please enter a new due date in the format 'MM/DD/YYYY'.", ""); 
    while(!checkIfDate(newDate)) {
        newDate = prompt("Please enter a new due date in the format 'MM/DD/YYYY'.", ""); 
    }

    dateCell.innerHTML = newDate;

  }

  // Edit a completion percentage
  function editPercent(r, c) {
    var percentCell = document.getElementById("r" + r + "c" + c);

    if(percentCell.innerHTML.length < 1) {
        return;
    }

    var newPercent = prompt("Please enter the updated progress completion percentage from 0 to 100.", "");
    while(!checkIfPercent(newPercent)) {
        newPercent = prompt("Please enter the updated progress completion percentage from 0 to 100.", "");
    }

    percentCell.innerHTML = newPercent + "%";
    colorCode(r, newPercent);
  }

  // Color code based on percentage
  function colorCode(r, x) {
    var taskCell = document.getElementById("r" + r + "c1");
    var dateCell = document.getElementById("r" + r + "c2");
    var percentCell = document.getElementById("r" + r + "c3");

    if(x < 33) {
        taskCell.style.backgroundColor = "#FFCCCB";
        dateCell.style.backgroundColor = "#FFCCCB";
        percentCell.style.backgroundColor = "#FFCCCB";
    } else if(x < 67) {
        taskCell.style.backgroundColor = "#FFFFE0";
        dateCell.style.backgroundColor = "#FFFFE0";
        percentCell.style.backgroundColor = "#FFFFE0";
    } else {
        taskCell.style.backgroundColor = "#90EE90";
        dateCell.style.backgroundColor = "#90EE90";
        percentCell.style.backgroundColor = "#90EE90";
    }
  }

  return (
    <>
      <body>
        <h1 style={{textAlign:"center"}}>To-Do! Application</h1>
        <div style={{textAlign:"center"}}>A demonstration of four Javascript client-side frameworks. This is Svelte.</div>
        <br/>
        <button id="newtask" class="newtask" value="2" onClick={newTask}>New Task</button>
        <br/><br/><br/>

        <table style={{width:"100%"}}>
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
            <tr id="r2" class="itemrow">
                <td id="r2c1" height="50px" width="33.33%" onClick={() => editTask(2, 1)}>

                </td>
                <td id="r2c2" height="50px" width="33.33%" onClick={() => editDate(2, 2)}>

                </td>
                <td id="r2c3" height="50px" width="33.33%" onClick={() => editPercent(2, 3)}>
                </td>
            </tr>
            <tr id="r3" class="itemrow">
                <td id="r3c1" height="50px" width="33.33%" onClick={() => editTask(3, 1)}>

                </td>
                <td id="r3c2" height="50px" width="33.33%" onClick={() => editDate(3, 2)}>

                </td>
                <td id="r3c3" height="50px" width="33.33%" onClick={() => editPercent(3, 3)}>
                </td>
            </tr>
            <tr id="r4" class="itemrow">
                <td id="r4c1" height="50px" width="33.33%" onClick={() => editTask(4, 1)}>

                </td>
                <td id="r4c2" height="50px" width="33.33%" onClick={() => editDate(4, 2)}>

                </td>
                <td id="r4c3" height="50px" width="33.33%" onClick={() => editPercent(4, 3)}>
                </td>
            </tr>
            <tr id="r5" class="itemrow">
                <td id="r5c1" height="50px" width="33.33%" onClick={() => editTask(5, 1)}>

                </td>
                <td id="r5c2" height="50px" width="33.33%" onClick={() => editDate(5, 2)}>

                </td>
                <td id="r5c3" height="50px" width="33.33%" onClick={() => editPercent(5, 3)}>
                </td>
            </tr>
            <tr id="r6" class="itemrow">
                <td id="r6c1" height="50px" width="33.33%" onClick={() => editTask(6, 1)}>

                </td>
                <td id="r6c2" height="50px" width="33.33%" onClick={() => editDate(6, 2)}>

                </td>
                <td id="r6c3" height="50px" width="33.33%" onClick={() => editPercent(6, 3)}>
                </td>
            </tr>
            <tr id="r7" class="itemrow">
                <td id="r7c1" height="50px" width="33.33%" onClick={() => editTask(7, 1)}>

                </td>
                <td id="r7c2" height="50px" width="33.33%" onClick={() => editDate(7, 2)}>

                </td>
                <td id="r7c3" height="50px" width="33.33%" onClick={() => editPercent(7, 3)}>
                </td>
            </tr>
            <tr id="r8" class="itemrow">
                <td id="r8c1" height="50px" width="33.33%" onClick={() => editTask(8, 1)}>

                </td>
                <td id="r8c2" height="50px" width="33.33%" onClick={() => editDate(8, 2)}>

                </td>
                <td id="r8c3" height="50px" width="33.33%" onClick={() => editPercent(8, 3)}>
                </td>
            </tr>
        </table>
    </body>
    </>
  )
}