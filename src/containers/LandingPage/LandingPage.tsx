import React, { useEffect, useState, MouseEvent, KeyboardEvent } from 'react';
import './LandingPage.css';
import { User } from '../../models';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {
  user: User,
  registerName: (name:string) => void,
  onChangeNameInput: (value:string) => void,
  invalidName: (value:string) => void,
}

const LandingPage: React.FC<IProps> = ({ user, registerName, onChangeNameInput, history, invalidName }) => {
  const [infobox, setInfobox] = useState('');

  //if user.infoBox true, display it on the page. 
  useEffect(() => {
    if (user.infoBox) {
      setInfobox(user.infoBox)
    } else {
      setInfobox('')
    }
  }, [user.infoBox])

  //if enteredChat is true, should be redirected to /chat
  useEffect(() => {
    if (user.enteredChat) history.push('/chat')
  }, [user.enteredChat, history])

  // send username to server to be registered if it goes through the validation. 
  const handleSubmit = (event: MouseEvent | KeyboardEvent) => {
    event.preventDefault();
    const regex = /^([A-Za-z0-9 _-]+)*$/gi;
    const validName:boolean = regex.test(user.name);
    const validLength:boolean = user.name.trim().length <= 20;

    if (!validName || user.name.trim() === '' || !user.name.trim() || !validLength) {
      invalidName('Nickname can only contain letters, numbers and " _-", between 1-20 characters long.');
      return;
    }

    registerName(user.name);
  }


  return (
    <div className="landingpage__outer-container">
      <div className="landingpage__inner-container">
        <div>
          <h1 className="landingpage__header">Narnia Chatroom</h1>
          <p className="landingpage__p">
            Chat about Narnia related stuff here! Or other things, no worries.
          </p>

        </div>
        <div className={user.infoBoxClass}>
          <p>{infobox}</p>
        </div>

        <div>
          <label className="label landingpage__label">Enter a nickname below</label>
          <input
            className="input landingpage__input"
            type="text"
            placeholder="Enter nickname..."
            value={user.name}
            onKeyPress={event => event.key === 'Enter' && handleSubmit(event)}
            onChange={event => onChangeNameInput(event.target.value)}
          />
          <button
            onClick={(event) => handleSubmit(event)}
            type="submit"
            className="button landingpage__button"
          >
            Enter chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
