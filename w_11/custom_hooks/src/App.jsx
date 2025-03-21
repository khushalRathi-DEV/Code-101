import { useState } from 'react'
import './App.css'


function useCounter() {
  const [count, setCount] = useState(0)
  function incrementcounter(){
    setCount(c => c+1)
  }
  return {
    count : count,
    incrementcounter : incrementcounter
  }
}
function App() {
  const {count,incrementcounter} = useCounter();
  return (
    <div>
      <button onClick={incrementcounter}>Increase Counter</button>
      <br/>
      {count}
    </div>
  )
}

export default App
