import React, { useEffect, useState } from 'react';
import './LandingPage.css'


const LandingPage = (props: any) => {
  const { user, registerName, onChangeNameInput, history, invalidName } = props;
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
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const regex = /^([A-Za-z0-9 _-]+)*$/gi;
    const validName = regex.test(user.name);

    if (!validName || user.name.trim() === '' || !user.name.trim()) {
      invalidName('Invalid nickname, can only contain letters, numbers and " _-"')
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
