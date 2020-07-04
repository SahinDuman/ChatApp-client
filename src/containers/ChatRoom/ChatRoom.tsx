import React, {  useEffect } from "react";
import io from "socket.io-client";
import { ENDPOINT } from '../../constants';


let socket: SocketIOClient.Socket;

const Chat = (props:any) => {
const {user, giveUserId, userLeaveChat, history} = props;

   useEffect(() => {
    if(!user.enteredChat) history.push('/')
  }, [user.enteredChat])

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit('entered_chat', { user }, (error: any) => {
      if (error) {
        alert(error);
        return;
      }
    });

    socket.on('adminMessage', (message: any) => {
      giveUserId(message.user.id)
    })

    socket.on('leave_chat', (message:any) => {
      userLeaveChat();
    })
   
  }, []);

  const onClickDisconnectHandler = (event:any) => {
    socket.emit('leave_chat', { user }, (error: any) => {
      if (error) {
        alert(error);
        return;
      }

    });
  }

  return (
    <div>
      <h1>Hello from chatroom</h1>
      <button onClick={onClickDisconnectHandler}>Leave chat</button>
    </div>
  );
}

export default Chat;