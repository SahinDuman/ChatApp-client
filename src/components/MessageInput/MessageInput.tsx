import React from 'react';
import './MessageInput.css';

const MessageInput = (props:any) => {
  const {chat, submitMessageHandler, onChangeMessageInput } = props;

  return (
    <form className="messageinput__container">
      <input 
        className="messageinput__input"
        type="text"
        placeholder="Type message here..."
        onKeyPress={event => event.key === 'Enter' && submitMessageHandler}
        onChange={event => onChangeMessageInput(event.target.value)}
        value={chat.currentMessage}
       /> 
      <button className="messageinput__button" onClick={submitMessageHandler}>Send</button>
    </form>
  )
}

export default MessageInput
