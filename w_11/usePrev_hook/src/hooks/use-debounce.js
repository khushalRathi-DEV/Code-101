import { useEffect, useState } from "react";

export const useDebounce = (value,delay) => {
  const [debouncedval,setDebouncedval] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
    setDebouncedval(value);    
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  },[value,delay]);

  return debouncedval;
}