import React, { useEffect } from 'react';
import Message from '../Message/Message';
import './Messages.css';

const Messages = (props:any) => {
  const {messages} = props;
  const scrollTarget = React.createRef<HTMLDivElement>();
  
  //auto scrolls to bottom when new message is recieved (By targeting a dummy div with a ref in the bottomg)
  const scrollToBottom = () => {
    const node: HTMLDivElement | null = scrollTarget.current; 
    
    if (node) { 
      node.scrollIntoView({behavior: 'smooth'}); 
    }
  }
  
  useEffect(scrollToBottom, [messages]);

  return (
    <div className="messages__container">
      {messages.map((message:any, index:any) => <Message key={index} {...message} /> )}
      <div ref={scrollTarget} />
    </div>
  )
}

export default Messages
