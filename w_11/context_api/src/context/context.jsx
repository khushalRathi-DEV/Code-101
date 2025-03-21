// import { createContext, useContext, useState } from 'react';

import { createContext, useContext, useState } from "react";

// // Create a context for the counter
// const CounterContext = createContext();

// // Create a provider component
// export function CounterProvider({ children }) {
//   const [count, setCount] = useState(0);

//   const handleIncrease = () => setCount(prevCount => prevCount + 1);
//   const handleDecrease = () => setCount(prevCount => prevCount - 1);

//   return (
//     <CounterContext.Provider value={{ count, handleIncrease, handleDecrease }}>
//       {children}
//     </CounterContext.Provider>
//   );
// }

// // Custom hook to use the CounterContext
// export function useCounter() {
//   return useContext(CounterContext);
// }
export const CounterContext = createContext();

export function CounterProvider({children}){
  const [count,setCount] = useState(0);

  const handleIncrease = () => setCount(c => c + 1);
  const handleDecrease = () => setCount(c => c - 1);

  return (
    <CounterContext.Provider value={{count,handleDecrease,handleIncrease}}>
      {children}
    </CounterContext.Provider>
  );
}

