import React from 'react';
import './Message.css';

const Message = (props: any) => {
  const {name, message, role} = props;

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
