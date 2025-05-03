import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const [messages,setMessages] = useState(["hi there","hey bitch"]);
  const [input_val,setInput_val] = useState("");
  const wsRef = useRef();  

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      setMessages(m => [...m,event.data]);
    }
    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type : "join",
        payload : {
          roomid : "mi"
        }
      }))
    }
    
  },[]);

  return (
    <div className='h-screen bg-black text-white'>
      <br></br>
      <div className='h-[90vh] max-w-[90%] mx-auto text-end text-xl p-4 ml-4'>
        {messages.map(message => <div className='bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl p-4 m-8'>
          {message}</div>)}
      </div>
      <div className='flex mb-10 mx-7 rounded-xl'>
        <input className=' w-[90%] p-2  text-black text-lg font-bold' type='text' placeholder='Type here' value ={input_val} onChange={(e) => setInput_val(e.target.value)}/>
        <button style={{ backgroundColor: 'rgb(52,100,235)' }} className='text-white px-7 py-4 font-bold text-lg' onClick={() => {
          wsRef.current.send(JSON.stringify({
            type : "chat",
            payload : {
              message : input_val
            }
          }));
        }}>Send</button>
      </div>    
    </div>
  )
}

export default App