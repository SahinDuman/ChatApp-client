import React, { Dispatch } from 'react';
import './SideBar.css';
import { Users } from '../../models';

interface IProps {
  navOpen: boolean,
  setNavOpen: Dispatch<boolean>,
  onClickDisconnectHandler: () => void,
  users: Users[],
  name: string
}

const SideBar: React.FC<IProps> = ({navOpen, setNavOpen, onClickDisconnectHandler, users, name }) => {
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
          return <li key={user.id} className={user.name === name ? 'sidebar__user app-color' : 'sidebar__user'}>
            {user.name}
            </li>
        })}

      </ul>

    </div>
  )
}

export default SideBar
