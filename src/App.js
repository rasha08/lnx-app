import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Messenger from './Messenger';
import Recipes from './Recipes';

const App = () =>
  <div>
    <Header />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Messenger} />
        <Route path="/recipes" component={Recipes} />
      </Switch>
    </BrowserRouter>
  </div>;

export default App;
