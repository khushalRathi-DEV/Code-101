import { createContext } from "react";

export const counterContext = createContext(null);

const counterContextProvider = ({children}) => {
  const [counter,setCounter] = useState(0);
  console.log('counterContextProvider is rendering');
  return (
    <counterContext.Provider value={{counter,setCounter}}>
      {children}
    </counterContext.Provider>
  )

}
export default counterContextProvider;
