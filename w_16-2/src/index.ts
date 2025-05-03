import { WebSocket, WebSocketServer, } from "ws";

interface User {
  socket : WebSocket;
  room : string;
}

const wss = new WebSocketServer({ port: 8080 });
let userCount = 0;
let allSockets : User[] = [];

wss.on("connection", (socket) => {

  console.log("user connected ");

  socket.on("message", (message) => {
    //@ts-ignore
    const parsedMessage = JSON.parse(message);
    if(parsedMessage.type === "join"){
      allSockets.push({
        socket,
        room : parsedMessage.payload.roomid
      })
    }

    if(parsedMessage.type === "chat"){
      const currentUserRoom = allSockets.find((x) => x.socket === socket)?.room;
      allSockets.forEach((x) => {
        if(x.room == currentUserRoom){
          x.socket.send(parsedMessage.payload.message);
        }
      })

    }
    
  });

  socket.on("close", () => {
   
});


});

/// INTITIAL CODE 
// import { WebSocket, WebSocketServer, } from "ws";

// const wss = new WebSocketServer({ port: 8080 });
// let userCount = 0;
// let allSocket : WebSocket[] = [];

// wss.on("connection", (socket) => {
//   allSocket.push(socket);
//   userCount++;
//   console.log("user connected #" + userCount);

//   socket.on("message", (message) => {
//     console.log("message received: " + message.toString());
//     allSocket.forEach((s) => {
//       setTimeout(() => {
//         if (s.readyState === s.OPEN) {
//           s.send("server: " + message.toString());
//         }
//       }, 1000);
//     });
//   });

//   socket.on("close", () => {
//     allSocket = allSocket.filter((s) => s !== socket);
//     console.log("user disconnected #" + userCount);
//     userCount--;
//   });
// });
