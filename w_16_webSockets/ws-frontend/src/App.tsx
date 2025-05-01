import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [socket,setSocket] =useState();
  const [message,setMessage] = useState("");
  // const handleSubmit = () => {
    
  // }

  const sendMessage = () => {
    if(!socket){
      return; 
    }
    //@ts-ignore
    socket.send(message);
  }
  useEffect(() => {

    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onerror = () => {

    }

    ws.onmessage = (event) => {
      alert(event.data);
    }
  },[])
  return (
    <div>
      <input type='text' placeholder='Enter your message here...' value={message} onChange={(e) => {setMessage(e.target.value)}} ></input>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App
