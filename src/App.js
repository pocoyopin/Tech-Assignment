import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Overview from './components/Overview';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/overview/:name' component={Overview} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
