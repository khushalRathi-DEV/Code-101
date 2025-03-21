import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'



function App() {
  const username_reference = useRef(null);
  const handleFocus = () => {
    username_reference.current.focus();
  }

  return (
    <>
    <h1>
      using the Use-Ref hook 
    </h1>
    <input ref={username_reference} type="text" placeholder='Username'></input>
    <input type="text" placeholder='Password'></input>
    <button onClick={handleFocus}>SUBMIT</button>
    </> 

  )
}

export default App
