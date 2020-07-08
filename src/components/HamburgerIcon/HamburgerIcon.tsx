import React from 'react';
import './HamburgerIcon.css';

const HamburgerIcon = (props:any) => {

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

export default HamburgerIcon
