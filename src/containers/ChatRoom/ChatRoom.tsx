import React, { useEffect, useState, MouseEvent } from "react";
import io from "socket.io-client";
import { connect } from 'react-redux';
import { Dispatch } from "redux";

import { onChangeMessageInput, clearCurrentMessage, addMessageToList, clearAllMessages, adminMessageToList } from '../../_actions/chatActions';
import { ENDPOINT } from '../../constants';
import { ChatActionsTypes } from '../../_actions/chatActionsTypes';

import ChatHeader from "../../components/ChatHeader/ChatHeader";
import Messages from "../../components/Messages/Messages";
import MessageInput from "../../components/MessageInput/MessageInput";
import './ChatRoom.css';
import { Message, Users, ChatState, User } from "../../models";
import SideBar from "../../components/SideBar/SideBar";
import { RouteComponentProps } from "react-router-dom";


const mapStateToProps = (state: { chat: ChatState; }) => {
  return {
    chat: state.chat
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ChatActionsTypes>) => {
  return {
    onChangeMessageInput: (message: string) => {
      dispatch(onChangeMessageInput(message))
    },
    clearCurrentMessage: () => {
      dispatch(clearCurrentMessage())
    },
    addMessageToList: (message: Message) => {
      dispatch(addMessageToList(message))
    },
    adminMessageToList: (message: Message, users: Users[]) => {
      dispatch(adminMessageToList(message, users))
    },
    clearAllMessages: () => {
      dispatch(clearAllMessages());
    }
  }
}

let socket: SocketIOClient.Socket;

interface IAdminMessage {
  user: {
    name: string,
    id: string
  },
  name: string,
  message: string,
  users: Users[],
  role: string
}

interface IProps extends RouteComponentProps {
  user: User,
  chat: ChatState,
  giveUserId: (id: string) => void,
  userLeaveChat: (reason: string) => void,
  userDisconnected: (reason: string) => void,
  onChangeMessageInput: (message: string) => void,
  addMessageToList: (message: Message) => void,
  adminMessageToList: (message: Message, users: Users[]) => void,
  clearCurrentMessage: () => void,
  clearAllMessages: () => void
}

const ChatRoom: React.FC<IProps> = ({
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
}) => {

  const [clientDisconnect, setClientDisconnect] = useState(false)
  const [navOpen, setNavOpen] = useState(false);

  //if enteredChat is false, should be redirected to landingpage "./"
  useEffect(() => { if (!user.enteredChat) history.push('/') }, [user.enteredChat, history]);


  useEffect(() => {
    //turns on client side socket if user got validated
    if (user.enteredChat) {
      socket = io(ENDPOINT);

      socket.emit('entered_chat', { user });


      // triggers everything needed when recieving message from bot/server
      socket.on('adminMessage', ({ user, name, message, role, users }: IAdminMessage) => {
        if (user && !user.id) giveUserId(user.id);

        adminMessageToList({ name, message, role }, users);
      });

      //triggers everything needed when message is recieved
      socket.on('message', (message: Message) => {
        addMessageToList(message)
        if (message.name === user.name) clearCurrentMessage();
      });

      //triggers everything needed when user leaves chat
      socket.on('leave_chat', (message: { message: string }) => {
        setClientDisconnect(true);
        clearAllMessages();
        userLeaveChat(message.message);
      });

      //triggers everything needed when user has been inactive for too long(configurable timelimit on serverside)
      socket.on('inactive', (message: { message: string }) => {
        setClientDisconnect(true);
        userDisconnected(message.message);
      });

      //triggers everything needed when serverside disconnect is recieved
      socket.on('disconnect', (message: string) => {
        if (!clientDisconnect && message !== 'io client disconnect') {
          userDisconnected('Lost connection');
        }
      });
    }

    //cleanup when component gets unmounted, closing the socket connection and clear all messages in clients state.
    return (() => {
      closeSocket();
    });
  }, []);

  const closeSocket = () => {
    if (socket) socket.close();
    clearAllMessages();
  }

  //Emits "leave_chat" so the server can handle removing the user. 
  const onClickDisconnectHandler = () => socket.emit('leave_chat', { user });

  //true if only whitespace, otherwhise false
  const IsNullOrWhitespace = (string: string): boolean => {
    if (typeof string === 'undefined' || string == null) return true;
    return !/\S/g.test(string);
  }

  //Submits/emits message to server
  const submitMessageHandler = (event: MouseEvent | KeyboardEvent) => {
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