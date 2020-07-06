import React, { useEffect, useState } from 'react';
import './LandingPage.css'


const LandingPage = (props:any) => {
  const {user, registerName, onChangeNameInput, history, invalidName} = props;
  const [infobox, setInfobox] = useState('');

  useEffect(() => {
    if(user.infoBox) {
      setInfobox(user.infoBox)
    } else {
      setInfobox('')
    }
  }, [user.infoBox])

  useEffect(() => {
    if(user.enteredChat) history.push('/chat')
  }, [user.enteredChat, history])
  
  const handleSubmit = (event:any)=> {
    event.preventDefault();
    const regex = /^([A-Za-z0-9 _-]+)*$/gi;
    const validName = regex.test(user.name);

    if(validName) {
      registerName(user.name);
      return;
    }

    invalidName('Invalid nickname, can only contain letters, numbers and " _-"')
  }


  return (
    <div className="landingpage__outer-container">
      <div className="landingpage__inner-container">
        <div>
          <h1 className="landingpage__header">Narnia Chatroom</h1>
          <p className="landingpage__p">
            Hi fellow chatter, welcome to the chatroom of Narnia!
          </p>

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

        <div className={user.infoBoxClass}>
          <p>{infobox}</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
