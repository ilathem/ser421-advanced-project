import react, { useState } from 'react';

export default function ReactDemo() {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <h1>Hello from react</h1>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </>
  )
}