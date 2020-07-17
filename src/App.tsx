import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {connect} from 'react-redux'

import { 
  registerName, 
  onChangeNameInput, 
  giveUserId, 
  userLeaveChat, 
  userDisconnected, 
  invalidName 
} from './_actions/userActions';
import {UserActionsType} from './_actions/userActionsTypes';
import LandingPage from './containers/LandingPage/LandingPage';
import ChatRoom from './containers/ChatRoom/ChatRoom';
import { User } from './models';
import { Dispatch } from 'redux';

const mapStateToProps = (state: { user: User }) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<UserActionsType>) => {
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
    },
    invalidName: (value: string) => {
      dispatch(invalidName(value))
    }
  }
}


interface IProps {
  user: User,
  registerName: (name:string) => void,
  onChangeNameInput: (value:string) => void,
  giveUserId: (id:string) => void,
  userLeaveChat: (reason:string) => void,
  userDisconnected: (reason:string) => void,
  invalidName: (value:string) => void
}

const App: React.FC<IProps> = ({
  user, 
  registerName, 
  onChangeNameInput, 
  giveUserId, 
  userLeaveChat,
  userDisconnected,
  invalidName
}) => {
  
  return (
    <Router>
      <Route 
        path="/" exact 
        render={(props) => <LandingPage {...props} 
        user={user} 
        registerName={registerName} 
        onChangeNameInput={onChangeNameInput}
        invalidName={invalidName}
      />} />
      
      <Route 
        path="/chat" 
        render={(props) => <ChatRoom {...props} 
        user={user} 
        giveUserId={giveUserId}
        userLeaveChat={userLeaveChat}
        userDisconnected={userDisconnected}
      />} />
    </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
