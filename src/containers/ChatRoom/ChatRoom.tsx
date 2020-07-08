import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { connect } from 'react-redux'

import { onChangeMessageInput, clearCurrentMessage, addMessageToList, clearAllMessages, adminMessageToList } from '../../_actions/chatActions';
import { ENDPOINT } from '../../constants';

import ChatHeader from "../../components/ChatHeader/ChatHeader";
import Messages from "../../components/Messages/Messages";
import MessageInput from "../../components/MessageInput/MessageInput";
import './ChatRoom.css';
import { Message, User } from "../../models";
import SideBar from "../../components/SideBar/SideBar";


const mapStateToProps = (state: { chat: any; }) => {
  return {
    chat: state.chat
  }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
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
    adminMessageToList: (message: Message, users: User[]) => {
      dispatch(adminMessageToList(message, users))
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
    adminMessageToList,
    clearCurrentMessage,
    clearAllMessages
  } = props;

  let clientDisconnect: boolean = false;
  const [navOpen, setNavOpen] = useState(false);

  //if enteredChat is false, should be redirected to landingpage "./"
  useEffect(() => { if (!user.enteredChat) history.push('/') }, [user.enteredChat, history]);

  useEffect(() => {
    //turns on client side socket if user got validated
    if (user.enteredChat) {
    socket = io(ENDPOINT); 

      socket.emit('entered_chat', { user });

      // triggers everything needed when recieving message from bot/server
      socket.on('adminMessage', (adminMessage: any) => {
        const { user, name, message, role, disconnect, users } = adminMessage

        if (user && !user.id) giveUserId(user.id);

        if (!disconnect) {
          adminMessageToList({ name, message, role }, users);
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
      if(socket) socket.close();
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
    <div className="chatroom__outer-container">

      <div className="chatroom__container">
        <ChatHeader
          setNavOpen={setNavOpen}
          navOpen={navOpen}
          name={user.name}
          room="Narnia Chat"
        />

        <Messages messages={chat.allMessages} />

        <MessageInput
          chat={chat}
          onChangeMessageInput={onChangeMessageInput}
          submitMessageHandler={submitMessageHandler}
        />
      </div>

      <SideBar 
      setNavOpen={setNavOpen} 
      navOpen={navOpen}
      onClickDisconnectHandler={onClickDisconnectHandler}
      users={chat.allUsers}
      name={user.name}
      />
    </div>

  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);