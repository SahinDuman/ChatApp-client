import React from 'react';
import './SideBar.css';

const SideBar = (props:any) => {
  const {navOpen, setNavOpen, onClickDisconnectHandler, users, name } = props;


  return (
    <div className={navOpen ? 'sidebar__container' : 'sidebar__container sidebar__hide'}>
      <div 
      onClick={() => setNavOpen(!navOpen)} 
      className={navOpen ? 'sidebar__overlay' : ''}>
      </div>
      <button className="sidebar__button" onClick={onClickDisconnectHandler}>Leave</button>
      <hr className="sidebar__hr" />
      <p className="sidebar__p">Active users</p>
      <ul className="sidebar__user-list">
        {users.map((user:any) => {
          return <li key={user.id} className={user.name === name ? 'sidenav__user app-color' : 'sidenav__user'}>
            {user.name}
            </li>
        })}

      </ul>

    </div>
  )
}

export default SideBar
