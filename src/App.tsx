import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {connect} from 'react-redux'

import { registerName, onChangeNameInput, giveUserId, userLeaveChat, userDisconnected } from './_actions/userActions';
import LandingPage from './containers/LandingPage/LandingPage';
import ChatRoom from './containers/ChatRoom/ChatRoom';

const mapStateToProps = (state: { user: any, app:any }) => {
  return {
    user: state.user,
    app: state.app
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
    userLeaveChat: (reason:string) => {
      dispatch(userLeaveChat(reason))
    },
    userDisconnected: (reason:string) => {
      dispatch(userDisconnected(reason))
    }
  }
}

const App = (props:any) => {
  const {
    user, 
    registerName, 
    onChangeNameInput, 
    giveUserId, 
    userLeaveChat,
    userDisconnected
  } = props;
  
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
        userDisconnected={userDisconnected}
      />} />
    </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
