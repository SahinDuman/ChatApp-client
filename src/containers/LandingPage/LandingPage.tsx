import React, { useEffect } from 'react';


const LandingPage = (props:any) => {

  useEffect(() => {
    if(props.user.enteredChat) props.history.push('/chat')
  }, [props.user.enteredChat])
  
  const handleSubmit = (event:any)=> {
    event.preventDefault();

    props.registerName(props.user.name)
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
          value={props.user.name}
          onChange={event => props.onChangeNameInput(event.target.value)}
        />
      </div>

      <button onClick={(event) => handleSubmit(event)} type="submit">Enter chat</button>
    </div>
  );
}

export default LandingPage;
