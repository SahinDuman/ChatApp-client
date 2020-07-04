import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {connect} from 'react-redux'


import { registerName, onChangeNameInput, giveUserId, userLeaveChat } from './_actions/userActions';
import LandingPage from './containers/LandingPage/LandingPage';
import ChatRoom from './containers/ChatRoom/ChatRoom';

const mapStateToProps = (state: { user: any }) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    giveUserId: (id:string) => {
      dispatch(giveUserId(id))
    },
    registerName: (name:string) => {
      dispatch(registerName(name))
    },
    onChangeNameInput: (value:string) => {
      dispatch(onChangeNameInput(value))
    },
    userLeaveChat: (value:string) => {
      dispatch(userLeaveChat(value))
    },
  }
}

const App = (props:any) => {
  const {user, registerName, onChangeNameInput, giveUserId, userLeaveChat} = props;
  
  return (
    <Router>
      <Route 
        path="/" exact 
        render={(props:any) => <LandingPage {...props} 
        user={user} 
        registerName={registerName} 
        onChangeNameInput={onChangeNameInput}  
      />} />
      
      <Route 
        path="/chat" 
        render={(props:any) => <ChatRoom {...props} 
        user={user} 
        giveUserId={giveUserId}
        userLeaveChat={userLeaveChat}
      />} />
    </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
