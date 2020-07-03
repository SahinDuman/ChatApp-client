import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {connect} from 'react-redux'


import { registerName, onChangeNameInput } from './_actions/userActions';
import LandingPage from './containers/LandingPage/LandingPage';
import ChatRoom from './containers/ChatRoom/ChatRoom';

const mapStateToProps = (state: { user: string; }) => {
  console.log(state);
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch: (arg0: any) => void) => {
  return {
    registerName: (name:string) => {
      dispatch(registerName(name))
    },
    onChangeNameInput: (value:string) => {
      dispatch(onChangeNameInput(value))
  }
  }
}

const App = (props:any) => {
  const {user, registerName, onChangeNameInput} = props;
  

  return (
    <Router>
      <Route path="/" exact render={(props:any) => <LandingPage {...props} user={user} registerName={registerName} onChangeNameInput={onChangeNameInput} />} />
      <Route path="/chat" component={ChatRoom} />
    </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
