import react, { useState, useEffect } from 'react';
import './todo.css';

export default function ReactDemo() {
  // user state
  const [user, setUser] = useState('');
  // array of todo items
  const [todos, setTodos] = useState([]);


  // for dev purposes: comment out when done
  // useEffect(() => {
  //   let username = 'test';
  //   setTodos(JSON.parse(window.localStorage.getItem(`${username}-react`)));
  //   setUser(username);
  // },[])
  ////////////////////////////////////////////


  // when array changes, update local storage
  useEffect(() => {
    window.localStorage.setItem(`${user}-react`, JSON.stringify(todos));
  }, [todos]);

  function logIn() {
    let username = prompt('Please enter your name');
    // user is logging in
    if (window.localStorage.getItem(`${username}-react`)) {
      setTodos(JSON.parse(window.localStorage.getItem(`${username}-react`)));
    }
    // new user
    setUser(username);
    // console.log(todos)
  }

  function addNewTodo(todo) {
    if (!todos) setTodos(todo); // if first one
    else {
      let todoArray = [...todos, todo];
      // reference no. 9 : 
      // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
      let sortedTodos = todoArray.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      // console.log({todoArray, sortedTodos})
      setTodos(sortedTodos);
    }
  }

  function newTask() {
    let title = prompt('Enter the task name');
    let titlesArray = todos.map((todo) => todo.title);
    while (titlesArray.includes(title)) {
      title = prompt('That task already exists! Enter another name');
    }
    let date = prompt('Enter future due date in format <MM/DD/YYYY>');
    while (!Date.parse(date) || Date.parse(date) < Date.now()) {
      date = prompt('Invalid syntax, use format <MM/DD/YYYY> in the future');
    }
    let percent = prompt('Enter completion percentage, value from 0 to 100');
    while (percent < 0 || percent > 100) {
      percent = prompt('Enter a value from 0 to 100');
    }
    addNewTodo({ title, date, percent });
  }

  function editTask(todoTitle) {

    console.log(event);
    if (event.target.tagName === 'TD') {
      console.log("is a td")
      let newTitle = prompt('What is the new title?');
      let titlesArray = todos.map((todo) => todo.title);
      while (titlesArray.includes(newTitle)) {
        newTitle = prompt('That name already exists! Enter another name');
      }
      let updatedArray = todos.map((todo) => {
        if (todo.title === todoTitle) {
          return {
            title: newTitle,
            date: todo.date,
            percent: todo.percent,
          };
        } else {
          return todo;
        }
      });
      setTodos(updatedArray);
      // console.log('running edit task')
    } else if (event.target.tagName === 'BUTTON') {
      console.log("is a button")
      deleteTask(todoTitle)
    }
  }

  function editDate(todoTitle) {
    // console.log("running edit date")
    let date = prompt('Enter future due date in format <MM/DD/YYYY>');
    while (!Date.parse(date) || Date.parse(date) < Date.now()) {
      date = prompt('Invalid syntax, use format <MM/DD/YYYY> in the future');
    }
    let updatedArray = todos.map((todo) => {
      if (todo.title === todoTitle) {
        return {
          title: todo.title,
          date: date,
          percent: todo.percent,
        };
      } else {
        return todo;
      }
    });
    let sortedTodos = updatedArray.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setTodos(sortedTodos);
  }

  function editPercent(todoTitle) {
    let percent = prompt('Enter completion percentage, value from 0 to 100');
    while (percent < 0 || percent > 100) {
      percent = prompt('Enter a value from 0 to 100');
    }
    let updatedArray = todos.map((todo) => {
      if (todo.title === todoTitle) {
        return {
          title: todo.title,
          date: todo.date,
          percent: percent,
        };
      } else {
        return todo;
      }
    });
    setTodos(updatedArray);
  }

  function deleteTask(todoTitle) {
    // create new array, which contains all elements of todos
    // where the title does not equal the supplied title
    let updatedArray = todos.filter((todo) => todo.title !== todoTitle);
    setTodos(updatedArray);
  }

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Todo! Application</h1>
      <p style={{ textAlign: 'center' }}>
        A demonstration of four Javascript client-side frameworks. This is React
      </p>
      <br />
      <button className='newtask' onClick={user ? newTask : logIn}>
        {user ? 'New Task' : 'Log in / Sign up'}
      </button>
      <br />
      <br />
      <br />
      {user && (
        <table style={{ width: '100%' }}>
          <thead>
            <tr className='toprow'>
              <td style={{ height: '50px', width: '33.33%' }}>
                <b>Task</b>
              </td>
              <td style={{ height: '50px', width: '33.33%' }}>
                <b>Due Date</b>
              </td>
              <td style={{ height: '50px', width: '33.33%' }}>
                <b>Progress</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr className='itemrow' key={todo.title}>
                  <td
                    style={{ height: '50px', width: '33.33%' }}
                    className='name-field'
                    onClick={() => editTask(todo.title)}
                  >
                    <button className='delete-btn' onClick={() => {console.log("clicked delete")}}>Delete</button>
                    {todo.title}
                  </td>
                  <td
                    style={{ height: '50px', width: '33.33%' }}
                    onClick={() => editDate(todo.title)}
                  >
                    {todo.date}
                  </td>
                  <td
                    style={{ height: '50px', width: '33.33%' }}
                    className={`progress-${
                      todo.percent < 33 ? '1' : todo.percent < 67 ? '2' : '3'
                    }`}
                    onClick={() => editPercent(todo.title)}
                  >
                    {todo.percent}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
