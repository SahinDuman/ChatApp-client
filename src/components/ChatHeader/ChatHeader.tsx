import React from 'react';
import './ChatHeader.css';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';

const ChatHeader = (props:any) => {
  const {room, name, setNavOpen, navOpen} = props;

  return (
    <header className="chatheader__container">
      <h2 className="chatheader__header">{room}, ({name})</h2>
      <HamburgerIcon setNavOpen={setNavOpen} navOpen={navOpen}/>
    </header>
  )
}

export default ChatHeader
