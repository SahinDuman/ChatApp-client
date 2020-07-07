import React, { useEffect } from "react";
import io from "socket.io-client";
import { connect } from 'react-redux'

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
    onChangeMessageInput: (message: string) => {
      dispatch(onChangeMessageInput(message))
    },
    clearCurrentMessage: () => {
      dispatch(clearCurrentMessage())
    },
    addMessageToList: (message: any) => {
      dispatch(addMessageToList(message))
    },
    clearAllMessages: () => {
      dispatch(clearAllMessages());
    }
  }
}

let socket: SocketIOClient.Socket;

const ChatRoom = (props: any) => {
  const {
    user,
    chat,
    giveUserId,
    userLeaveChat,
    userDisconnected,
    history,
    onChangeMessageInput,
    addMessageToList,
    clearCurrentMessage,
    clearAllMessages
  } = props;

  let admin = {
    name: '',
  };

  let clientDisconnect: boolean = false;

  //if enteredChat is false, should be redirected to landingpage "./"
  useEffect(() => { if (!user.enteredChat) history.push('/') }, [user.enteredChat]);

  useEffect(() => {
    //turns on client side socket if user got validated
    if (user.enteredChat) {
    socket = io(ENDPOINT); 

      socket.emit('entered_chat', { user });

      // triggers everything needed when recieving message from bot/server
      socket.on('adminMessage', (adminMessage: any) => {
        const { user, name, message, role, disconnect } = adminMessage

        if (user && !user.id) giveUserId(user.id);

        if (!disconnect) {
          addMessageToList({ name, message, role });
        }
      });

      //triggers everything needed when message is recieved
      socket.on('message', (message: any) => {
        addMessageToList(message)
        if (message.name === user.name) clearCurrentMessage();
      });

      //triggers everything needed when user leaves chat
      socket.on('leave_chat', (message: any) => {
        clientDisconnect = true;
        clearAllMessages();
        userLeaveChat(message.message);
      });

      //triggers everything needed when user has been inactive for too long(configurable timelimit on serverside)
      socket.on('inactive', (message: any) => {
        clientDisconnect = true;
        userDisconnected(message.message);
      });

      //triggers everything needed when serverside disconnect is recieved
      socket.on('disconnect', (message: any) => {
        if (!clientDisconnect && message !== 'io client disconnect') {
          userDisconnected('Lost connection');
        }
      });
    }

    //cleanup when component gets unmounted, closing the socket connection and clear all messages in clients state.
    return (() => {
      socket.close();
      clearAllMessages();
    });
  }, []);


  //Emits "leave_chat" so the server can handle removing the user. 
  const onClickDisconnectHandler = () => socket.emit('leave_chat', { user });

  //true if only whitespace, otherwhise false
  const IsNullOrWhitespace = (string: string): boolean => {
    if (typeof string === 'undefined' || string == null) return true;
    return !/\S/g.test(string);
  }

  //Submits/emits message to server
  const submitMessageHandler = (event: any) => {
    event.preventDefault();
    if (socket && !IsNullOrWhitespace(chat.currentMessage)) {
      socket.emit('message', { name: user.name, chatMessage: chat.currentMessage })
    }
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