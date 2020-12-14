import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Visualize from './pages/Visualize';
import Contribute from './pages/Contribute';
import SingleCard from './components/SingleCard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <SingleCard />
      <Switch>
        <Route exact path="/" component={Explore} />
        <Route path="/visualiser" component={Visualize} />
        <Route path="/contribuer" component={Contribute} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
