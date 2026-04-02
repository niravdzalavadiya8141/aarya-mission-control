import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Settings from './pages/Settings';
// other imports
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/settings" component={Settings} />
        // other routes
      </Switch>
    </Router>
  );
}
