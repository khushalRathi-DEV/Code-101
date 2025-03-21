import { useState } from 'react'
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { counterAtom, evenSelector } from './state/atom/Counteratom';

function Counter(){
  const count = useRecoilState(counterAtom);

  return(
    <div>
      {count}
    </div>
  )
}
function Increment(){
  const setCount = useSetRecoilState(counterAtom);

  return(
    <button onClick={() => setCount(c => c + 2 )}>+</button>
  )
}
function Decrement(){
  const setCount = useSetRecoilState(counterAtom);
  
  return(
    <button onClick={() => setCount(c => c - 1 )}>-</button>
  )

}

function EvenCheck(){
  const isEven = useRecoilValue(evenSelector);

  return(
    <div>
      <h2>
        {isEven ? "Even" : "Odd"}
      </h2>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RecoilRoot>
      <Counter/>
      <Increment/>  
      <Decrement/>
      <EvenCheck/>
      </RecoilRoot>
    </div>
  )
}

export default App
