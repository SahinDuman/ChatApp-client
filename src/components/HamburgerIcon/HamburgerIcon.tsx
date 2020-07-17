import React, { Dispatch } from 'react';
import './HamburgerIcon.css';

interface IProps {
  navOpen: boolean,
  setNavOpen: Dispatch<boolean>
}

const HamburgerIcon: React.FC<IProps> = (props) => {

  const onClick = () => {
    console.log('NAVBAR STATE', props.navOpen);
    props.setNavOpen(!props.navOpen)
  }

  return (
    <div className={props.navOpen ? 'nav-icon nav-icon__open' : 'nav-icon'} onClick={onClick}>
      <div></div>
    </div>
  )
}

export default HamburgerIcon;