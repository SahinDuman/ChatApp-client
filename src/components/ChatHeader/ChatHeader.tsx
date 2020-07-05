import React from 'react';
import './ChatHeader.css';

const ChatHeader = (props:any) => {
  const {room, name, onClickDisconnectHandler} = props;

  return (
    <header className="chatheader__container">
      <h2 className="chatheader__header">{room}, ({name})</h2>
      <button className="chatheader__button" onClick={onClickDisconnectHandler}>Leave</button>
    </header>
  )
}

export default ChatHeader
