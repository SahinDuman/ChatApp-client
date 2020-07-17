import React, { Dispatch } from 'react';
import './ChatHeader.css';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';

interface IProps {
  room: string,
  name: string,
  navOpen: boolean,
  setNavOpen: Dispatch<boolean>
}

const ChatHeader: React.FC<IProps> = ({room, name, setNavOpen, navOpen}) => {
  return (
    <header className="chatheader__container">
      <h2 className="chatheader__header">{room}, ({name})</h2>
      <HamburgerIcon setNavOpen={setNavOpen} navOpen={navOpen}/>
    </header>
  )
}

export default ChatHeader
