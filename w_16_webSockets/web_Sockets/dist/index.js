"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
//event handler 
wss.on("connection", function (socket) {
    console.log("user connected");
    // socket.send("hello from socket");
    // setInterval(() => {
    //   socket.send("price of Sol is : $" + Math.floor(Math.random()*100));
    // },5000);
    // socket.on("message",(e) => {
    //   console.log(e.toString());
    // });
    socket.on("message", (e) => {
        console.log(e.toString());
        if (e.toString() === "ping") {
            socket.send("pong");
        }
        else {
            socket.send("not pong");
        }
    });
});
