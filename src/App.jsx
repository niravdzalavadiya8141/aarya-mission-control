import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Gamification from './pages/Gamification';
// other imports
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/xp" component={Gamification} />
        // other routes
      </Switch>
    </Router>
  );
}
