import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Visualize from './pages/Visualize';
import Contribute from './pages/Contribute';
import Species from './pages/Species';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Explore} />
        <Route path="/espece/:id" component={Species} />
        <Route path="/visualiser" component={Visualize} />
        <Route path="/contribuer" component={Contribute} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
