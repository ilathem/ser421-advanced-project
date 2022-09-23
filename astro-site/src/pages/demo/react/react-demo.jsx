import react, { useState, useEffect } from 'react';
import './todo.css';

export default function ReactDemo() {
  // user state
  const [user, setUser] = useState('f');
  // array of todo items
  const [todos, setTodos] = useState([]);
  // state for storing current edited todo item
  const [currentTodoTitle, setCurrentTodoTitle] = useState('');
  const [currentTodoDate, setCurrentTodoDate] = useState(new Date());
  const [currentTodoPercent, setCurrentTodoPercent] = useState('');

  // when current todo item changes, update array
  useEffect(() => {
    console.log('current todo has changed!');
    
  }, [currentTodoDate, currentTodoTitle, currentTodoPercent]);

  function newTask() {}

  function logIn() {
    let username = prompt('Please enter your name');
    // user is logging in
    if (window.localStorage.getItem(username)) {
      setTodos(JSON.parse(window.localStorage.getItem(username)));
    }
    // new user
    setUser(username)
  }

  function editTask(todoTitle) {}

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
          {todos.map((todo) => {
            return (
              <tr className='itemrow' key={todo}>
                <td
                  style={{ height: '50px', width: '33.33%' }}
                  onClick={editTask(todo)}
                >
                  {todo.title}
                </td>
                <td
                  style={{ height: '50px', width: '33.33%' }}
                  onClick={editDate(todo)}
                >
                  {todo.date}
                </td>
                <td
                  style={{ height: '50px', width: '33.33%' }}
                  onClick={editPercent(todo)}
                >
                  {todo.percent}%
                </td>
              </tr>
            );
          })}
        </table>
      )}
    </>
  );
}
