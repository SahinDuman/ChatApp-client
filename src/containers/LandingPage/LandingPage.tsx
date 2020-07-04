import React, { useEffect } from 'react';


const LandingPage = (props:any) => {
  const {user, registerName, onChangeNameInput, history} = props;

  useEffect(() => {
    if(user.enteredChat) history.push('/chat')
  }, [user.enteredChat, history])
  
  const handleSubmit = (event:any)=> {
    event.preventDefault();
    registerName(user.name)
  }


  return (
    <div>
      <h1>Narnia Chatroom</h1>
      <p>
        Hi fellow chatter, welcome to the chatroom of Narnia!
        <br/>
        Please enter your prefered nickname below to join the chat.
      </p>
      <div>
        <input 
          type="text" 
          placeholder="Enter nickname..." 
          value={user.name}
          onChange={event => onChangeNameInput(event.target.value)}
        />
      </div>

      <button onClick={(event) => handleSubmit(event)} type="submit">Enter chat</button>
    </div>
  );
}

export default LandingPage;
