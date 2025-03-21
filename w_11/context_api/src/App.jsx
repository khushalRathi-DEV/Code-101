import { useContext, useState } from 'react'
import './App.css'
import { CounterContext } from './context/context'

function Extracomponent() {
  return(
    <div>
      <h2>I am an extracomponent</h2>
      <p>
        Letse see if i re render if i am not changing ,but the count is changing
      </p>
    </div>
  )
}

function App() {
  const {count,handleIncrease,handleDecrease} = useContext(CounterContext);

  return (
    <div>
      counter: {count}
      <button onClick={handleIncrease}>Increase</button>
      <button onClick={handleDecrease}>Decrease</button>
      <Extracomponent />
    </div>
  )
}

export default App
