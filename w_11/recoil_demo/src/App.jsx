import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import './App.css'
import { counterAtom } from './state/atom/Counter'

function App() {
  
  return (
    <div>
      <RecoilRoot>
        <Counter/>
        <Increase/>
        <Decrease/>
      </RecoilRoot>
    </div>
  )
}
function Counter(){
  const count = useRecoilValue(counterAtom);
  return(
    <div>
      <h1>{count}</h1>
    </div>
  )
}

function Increase(){
  const setCount = useSetRecoilState(counterAtom);
  const handleincrease = () => {
    setCount(c => c+1);
  }
  return(
    <div>
      <button onClick={handleincrease}>+</button>
    </div>
  )
}

function Decrease(){  
  const setCount = useSetRecoilState(counterAtom);  
  const handleDecrease = () => {
    setCount(c => c-1);
  }
  return(
    <div>
      <button onClick={handleDecrease}>-</button>
    </div>
  )
  }
export default App
