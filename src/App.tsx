import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from './containers/LandingPage/LandingPage';
import ChatRoom from './containers/ChatRoom/ChatRoom';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={LandingPage} />
      <Route path="/chat" component={ChatRoom} />
    </Router>
  );
}

export default App;
