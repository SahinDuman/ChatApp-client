import React, {  useEffect } from "react";
import io from "socket.io-client";
import {connect} from 'react-redux'

import { onChangeMessageInput, clearCurrentMessage, addMessageToList, clearAllMessages } from '../../_actions/chatActions';
import { ENDPOINT } from '../../constants';

import ChatHeader from "../../components/ChatHeader/ChatHeader";
import Messages from "../../components/Messages/Messages";
import MessageInput from "../../components/MessageInput/MessageInput";
import './ChatRoom.css';


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
    },
    clearAllMessages: () => {
      dispatch(clearAllMessages());
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
  clearCurrentMessage,
  clearAllMessages
} = props;

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
      if(message.name === user.name) clearCurrentMessage();
    });
 

    socket.on('leave_chat', () => {
      clearAllMessages();
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

  const submitMessageHandler = (event:any) => {
    event.preventDefault();
    socket.emit('message', { name: user.name, message: chat.currentMessage})
  }

  return (
    <div className="chatroom__container">
      <ChatHeader 
        name={user.name} 
        room="Narnia Chat" 
        onClickDisconnectHandler={onClickDisconnectHandler} 
      />

      <Messages messages={chat.allMessages} />
      
      <MessageInput 
        chat={chat} 
        onChangeMessageInput={onChangeMessageInput} 
        submitMessageHandler={submitMessageHandler} 
      />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);