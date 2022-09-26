<!-- Author: Eric Hunley -->
<!-- Test me at https://svelte.dev/examples/hello-world#hello-world -->

<!-- Javascript Scripting -->
<script lang="js">
    import {onMount} from 'svelte';

    var row = 2;
    var name = "";

    // Enter a new task
    function newTask() {
        var r = parseInt(document.getElementById("newtask").value);

        if(r > 8) {
            alert("The task list is full.");
            return;
        }

        var taskCell = document.getElementById("r" + r + "c1");
        var dateCell = document.getElementById("r" + r + "c2");
        var progressCell = document.getElementById("r" + r + "c3");

        var task = prompt("Please enter a task name of at least one and up to 15 characters.", "");
        while(task.length > 15 || task.length < 1) {
            task = prompt("Please enter a task name of at least one and up to 15 characters.", "");
        }

        var date = prompt("Please enter a future due date in the format 'MM/DD/YYYY'.", "");
        var today = getCurrentDate();

        var comp = compareDates(date, today);

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
        progressCell.value = progress;
        colorCode(parseInt(r), progress);

        storeData();

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
    }

    // Compare dates
    function compareDates(x, y) {
        var entYear = parseInt(x.substring(6));
        var entMonth = parseInt(x.substring(0));
        var entDay = parseInt(x.substring(3));

        var currYear = parseInt(y.substring(6));
        var currMonth = parseInt(y.substring(0));
        var currDay = parseInt(y.substring(3));

        if(entYear < currYear) {
            return false;
        } else if(entMonth < currMonth && entYear === currYear) {
            return false;
        } else if(entDay <= currDay && entMonth === currMonth && entYear === currYear) {
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

    // Color code at loading
    function colorCodeOnLoad() {
        var i = 2;

        while(document.getElementById("r" + i + "c3").innerHTML != "") {
            var j = document.getElementById("r" + i + "c3").value;

            colorCode(i, j);

            i += 1;

            if(i === 9) {
                break;
            }
        }
    }

    // Ask for name at load, check for local storage
    function getName() {
        var userName = prompt("Hello! Please enter your name.", "");
        sessionStorage.setItem("name", userName);

        if(localStorage.getItem(userName + "tasks") != null) {
            var tasks = localStorage.getItem(userName + "tasks");
            var dates = localStorage.getItem(userName + "dates");
            var percents = localStorage.getItem(userName + "percents");
            var colors = localStorage.getItem(userName + "colors");

            var tasksArray = tasks.split("@");
            var datesArray = dates.split("@");
            var percentsArray = percents.split("@");
            var colorsArray = colors.split("@");

            for(var i = 0; i < tasksArray.length - 1; i++) {
                var j = i + 2;
                var cell = document.getElementById("r" + j + "c1");
                if(tasksArray[i] != null) {
                    if(i > 0) {
                        tasksArray[i] = tasksArray[i].substring(1);
                    }
                    cell.innerHTML = tasksArray[i];
                }
            }

            for(var i = 0; i < datesArray.length - 1; i++) {
                var j = i + 2;
                var cell = document.getElementById("r" + j + "c2");
                if(datesArray[i] != null) { 
                    if(i > 0) {
                        datesArray[i] = datesArray[i].substring(1);
                    }
                    cell.innerHTML = datesArray[i];
                }
            }

            for(var i = 0; i < percentsArray.length - 1; i++) {
                var j = i + 2;
                var cell = document.getElementById("r" + j + "c3");
                if(percentsArray[i] != null) {
                    if(i > 0) {
                        percentsArray[i] = percentsArray[i].substring(1);
                    }
                    cell.innerHTML = percentsArray[i];
                }
            }

            for(var i = 0; i < colorsArray.length - 1; i++) {
                var j = i + 2;
                var cell = document.getElementById("r" + j + "c3");
                if(colorsArray[i] != null) {
                    if(i > 0) {
                        colorsArray[i] = colorsArray[i].substring(1);
                    }
                    cell.value = colorsArray[i];
                }
            }

            var i = 2;

            while(document.getElementById("r" + i + "c1").innerHTML != "") {
                i += 1;

                if(i === 9) {
                    break;
                }
            }

            document.getElementById("newtask").value = i;

        } else {
            document.getElementById("newtask").value = 2;
        }

        colorCodeOnLoad();
    }

    // Store user task data
    function storeData() {
        var name = sessionStorage.getItem("name");

        var tasks = [];
        var dates = [];
        var percents = [];
        var colors = [];

        var i = 2;
        var j;
        var k;

        while(i < 9) {
            while(document.getElementById("r" + i + "c1").innerHTML != "") {
                i += 1;

                if(i === 9) {
                    break;
                }
            }
            i += 1;
        }

        j = i - 2;
        i = 0;

        for(i; i < j; i++) {
            k = i + 2;
            tasks[i] = document.getElementById("r" + k + "c1").innerHTML + "@";
            dates[i] = document.getElementById("r" + k + "c2").innerHTML + "@";
            percents[i] = document.getElementById("r" + k + "c3").innerHTML + "@";
            colors[i] = document.getElementById("r" + k + "c3").value + "@";
        }

        localStorage.setItem(name + "tasks", tasks);
        localStorage.setItem(name + "dates", dates);
        localStorage.setItem(name + "percents", percents);
        localStorage.setItem(name + "colors", colors);
    }

    // Run on mount
    onMount(() => {
        getName();
    });

</script>
  
<!-- HTML Components -->
<section>
    <body>
        <h1 style="text-align:center;">To-Do! Application</h1>
        <div style="text-align:center;">A demonstration of four Javascript client-side frameworks. This is Svelte.</div>
        <div style="text-align:center;">You can edit a previously entered field by clicking on it.</div>
        <br>
        <button id="newtask" class="newtask" value="2" on:click={newTask}>New Task</button>
        <br><br><br>

        <table style="width:100%">
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
                <td id="r2c1" height="50px" width="33.33%" on:click={() => editTask(2, 1)}>

                </td>
                <td id="r2c2" height="50px" width="33.33%" on:click={() => editDate(2, 2)}>

                </td>
                <td id="r2c3" height="50px" width="33.33%" on:click={() => editPercent(2, 3)}>
                </td>
            </tr>
            <tr id="r3" class="itemrow">
                <td id="r3c1" height="50px" width="33.33%" on:click={() => editTask(3, 1)}>

                </td>
                <td id="r3c2" height="50px" width="33.33%" on:click={() => editDate(3, 2)}>

                </td>
                <td id="r3c3" height="50px" width="33.33%" on:click={() => editPercent(3, 3)}>
                </td>
            </tr>
            <tr id="r4" class="itemrow">
                <td id="r4c1" height="50px" width="33.33%" on:click={() => editTask(4, 1)}>

                </td>
                <td id="r4c2" height="50px" width="33.33%" on:click={() => editDate(4, 2)}>

                </td>
                <td id="r4c3" height="50px" width="33.33%" on:click={() => editPercent(4, 3)}>
                </td>
            </tr>
            <tr id="r5" class="itemrow">
                <td id="r5c1" height="50px" width="33.33%" on:click={() => editTask(5, 1)}>

                </td>
                <td id="r5c2" height="50px" width="33.33%" on:click={() => editDate(5, 2)}>

                </td>
                <td id="r5c3" height="50px" width="33.33%" on:click={() => editPercent(5, 3)}>
                </td>
            </tr>
            <tr id="r6" class="itemrow">
                <td id="r6c1" height="50px" width="33.33%" on:click={() => editTask(6, 1)}>

                </td>
                <td id="r6c2" height="50px" width="33.33%" on:click={() => editDate(6, 2)}>

                </td>
                <td id="r6c3" height="50px" width="33.33%" on:click={() => editPercent(6, 3)}>
                </td>
            </tr>
            <tr id="r7" class="itemrow">
                <td id="r7c1" height="50px" width="33.33%" on:click={() => editTask(7, 1)}>

                </td>
                <td id="r7c2" height="50px" width="33.33%" on:click={() => editDate(7, 2)}>

                </td>
                <td id="r7c3" height="50px" width="33.33%" on:click={() => editPercent(7, 3)}>
                </td>
            </tr>
            <tr id="r8" class="itemrow">
                <td id="r8c1" height="50px" width="33.33%" on:click={() => editTask(8, 1)}>

                </td>
                <td id="r8c2" height="50px" width="33.33%" on:click={() => editDate(8, 2)}>

                </td>
                <td id="r8c3" height="50px" width="33.33%" on:click={() => editPercent(8, 3)}>
                </td>
            </tr>
        </table>
    </body>
</section>

<!-- CSS Styling -->
<style>
    body {
        background-color: #F0FFFF;
    }
    table, th, td {
      border:1px solid black;
      text-align: center;
    }
    .toprow {
      background-color: #5F9EA0;
    }
    .itemrow {
      background-color: #00FFFF;
    }
    /* Borrowed from getcssscan.com -> Dribbble */
    .newtask {
    background-color: #A9A9A9;
    border-radius: 8px;
    border-style: none;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
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
    background-color: #F082AC;
    }
</style>
