import React, { useContext } from 'react'
import { counterContext } from './contextApi'

const contextapipage = () => {
  const {counter,setCounter} = useContext(counterContext);

  return (
    <div>
      <h2>
        This page illustrates statemanagement using context api
      </h2>
      <hr/>
      <div>
        Counter : {counter}
      </div>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>
    </div>
  )
}

export default contextapipage