import React, { MouseEvent } from 'react';
import './MessageInput.css';
import { ChatState } from '../../models';

interface IProps {
  chat: ChatState,
  onChangeMessageInput: (message: string) => void,
  submitMessageHandler: (event: MouseEvent | KeyboardEvent) => void
}

const MessageInput: React.FC<IProps> = ({chat, submitMessageHandler, onChangeMessageInput }) => {

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
