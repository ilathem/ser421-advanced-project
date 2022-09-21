import react, { useState, useEffect } from 'react';

export default function ReactDemo() {
  const [todos, setTodos] = useState([]);
  const [currentTodoTitle, setCurrentTodoTitle] = useState('')

  useEffect(() => {
    if (window.localStorage.getItem("todos"))
      setTodos(JSON.parse(window.localStorage.getItem("todos")))
  }, [])

  console.log(todos);

  return (
    <>
      <h1>React Todo List</h1>
      <input 
        type="text"
        value={currentTodoTitle}
        onChange={(e) => setCurrentTodoTitle(e.target.value)}
      />
      <button onClick={() => {
        setTodos([
          ...todos,
          {
            title: currentTodoTitle
          }
        ])
      }}>Create</button>
      {todos?.map((todo, index) => {
        return (
          <div key={index}>
            <p>{todo.title}</p>
          </div>
        )
      })}
    </>
  )
}