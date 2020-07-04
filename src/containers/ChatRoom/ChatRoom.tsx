import React, {  useEffect } from "react";
import io from "socket.io-client";
import {connect} from 'react-redux'

import { onChangeMessageInput, clearCurrentMessage, addMessageToList } from '../../_actions/chatActions';

import { ENDPOINT } from '../../constants';


const mapStateToProps = (state: { chat: any; }) => {
  return {
    chat: state.chat
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChangeMessageInput: (message:string) => {
      dispatch(onChangeMessageInput(message))
    },
    clearCurrentMessage: () => {
      dispatch(clearCurrentMessage())
    },
    addMessageToList: (message:any) => {
      dispatch(addMessageToList(message))
    }
  }
}

let socket: SocketIOClient.Socket;

const ChatRoom = (props:any) => {
const {
  user,
  chat,
  giveUserId,
  userLeaveChat,
  history, 
  onChangeMessageInput,
  addMessageToList,
  clearCurrentMessage
} = props;

console.log('CHAT', chat);
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

    socket.on('adminMessage', (adminMessage: any) => {
      const {user, name, message, role } = adminMessage
      if (user) giveUserId(user.id);
      addMessageToList({name, message, role})
    });

    socket.on('message', (message: any) => {
      console.log('message:::', message);
      addMessageToList(message)
      if(message.role === 'client') clearCurrentMessage();
    });
 

    socket.on('leave_chat', () => {
      userLeaveChat();
    })

  /*   socket.on('disconnect', (message:any) => {
      console.log(message);
    })
    */
  }, []);

  const onClickDisconnectHandler = (event:any) => {
    socket.emit('leave_chat', { user }, (error: any) => {
      if (error) {
        alert(error);
        return;
      }

    });
  }

  const submitMessageHandler = () => {
    console.log('SUBMIT MESSAGE', chat, user);
    socket.emit('message', { name: user.name, message: chat.currentMessage })
  }

  return (
    <div>
      <h1>Hello from chatroom</h1>
      <button onClick={onClickDisconnectHandler}>Leave chat</button>
      <div>
        Messages here
      </div>

      <input 
      type="text" 
      onKeyPress={event => event.key === 'Enter' && submitMessageHandler()}
      onChange={event => onChangeMessageInput(event.target.value)}
      value={chat.message}
       /> 
      <button onClick={submitMessageHandler}>Send</button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);