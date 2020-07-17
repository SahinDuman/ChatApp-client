import React from 'react';
import './Message.css';
import {Message as IMessage } from '../../models';

const Message: React.FC<IMessage> = ({name, message, role}) => {
  return (
    <div className={'message__container ' + role}>
      <div className="message__box">
        <p className="message__name">{name}</p>
        <p className="message__message">{message}</p>
      </div>
    </div>
  )
}

export default Message
