import { useEffect, useState } from 'react'
import './App.css'
import { usePrev } from './hooks/use-Prev';
import { useDebounce } from './hooks/use-debounce';

function App() {
  const [count,setCount] = useState(0);
  const prev = usePrev(count);
  const [value,setValue] = useState("");
  const debouncedvalue = useDebounce(value,800);

  function handlechange(e){
    setValue(e.target.value);
  }
  useEffect(() => {
    console.log("Expensive Operation");
  },[debouncedvalue]);

  return (
    <div>
      <button onClick={() => {
        setCount(c => c+1)
      }}>Increase count</button>
      <br/>
      counter:{count}
      <br/>
      <p>Previous value was : {prev}</p>
      <h2>
        Using debounce hook for below input-box
      </h2>
      <p>
        If the user is typing very fast then,Sending request for expensive operation only after user has finished typing 
      </p>
      <input type='text' onChange={handlechange}/>
    </div>
  )
}

export default App
