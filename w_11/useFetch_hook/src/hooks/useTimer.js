import { useEffect, useState } from 'react';
export function useTimer () {
  const [timer,setTimer] = useState(0);
  useEffect(() =>{
    const interval = setInterval(() => {
      setTimer(t => t+1)
    },5000)
  },[])
  return timer;
}
