import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { ENDPOINT } from '../../constants';


let socket: SocketIOClient.Socket;

const Chat = (props:any) => {

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit('entered_chat', { name:props.user }, (error: any) => {
      console.log('reeeee');
      if (error) {
        alert(error);
      }
    });

   
  }, []);

  useEffect(() => {
    socket.on('adminMessage', (message: any) => {
      console.log(message);
    })
  }, [])

  return (
    <div>
      <h1>Hello from chatroom</h1>
    </div>
  );
}

export default Chat;