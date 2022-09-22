<!-- Javascript Scripting -->
<script lang="js">
    let count = 0
</script>
  
<!-- HTML Components -->
<body>
    <h1 style="text-align:center;">To-Do! Application</h1>
    <div style="text-align:center;">A demonstration of four Javascript client-side frameworks. This is Svelte.</div>
    <br>
    <button id="newtask" class="newtask" on:click={() => {count += 1}}>New Task</button>
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
            <td id="r2c1" height="50px" width="33.33%">

            </td>
            <td id="r2c2" height="50px" width="33.33%">

            </td>
            <td id="r2c3" height="50px" width="33.33%">
            </td>
        </tr>
        <tr id="r3" class="itemrow">
            <td id="r3c1" height="50px" width="33.33%">

            </td>
            <td id="r3c2" height="50px" width="33.33%">

            </td>
            <td id="r3c3" height="50px" width="33.33%">
            </td>
        </tr>
        <tr id="r4" class="itemrow">
            <td id="r4c1" height="50px" width="33.33%">

            </td>
            <td id="r4c2" height="50px" width="33.33%">

            </td>
            <td id="r4c3" height="50px" width="33.33%">
            </td>
        </tr>
        <tr id="r5" class="itemrow">
            <td id="r5c1" height="50px" width="33.33%">

            </td>
            <td id="r5c2" height="50px" width="33.33%">

            </td>
            <td id="r5c3" height="50px" width="33.33%">
            </td>
        </tr>
        <tr id="r6" class="itemrow">
            <td id="r6c1" height="50px" width="33.33%">

            </td>
            <td id="r6c2" height="50px" width="33.33%">

            </td>
            <td id="r6c3" height="50px" width="33.33%">
            </td>
        </tr>
        <tr id="r7" class="itemrow">
            <td id="r7c1" height="50px" width="33.33%">

            </td>
            <td id="r7c2" height="50px" width="33.33%">

            </td>
            <td id="r7c3" height="50px" width="33.33%">
            </td>
        </tr>
        <tr id="r8" class="itemrow">
            <td id="r8c1" height="50px" width="33.33%">

            </td>
            <td id="r8c2" height="50px" width="33.33%">

            </td>
            <td id="r8c3" height="50px" width="33.33%">
            </td>
        </tr>
    </table>
</body>

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
