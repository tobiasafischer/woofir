import React from 'react';
import RadioIcon from '@material-ui/icons/Radio';
import './App.scss';
import Home from './Home/Home';

const App = () => (
  <div className="App">
    <div className="logo-container">
      <RadioIcon />
      <h1 className="logo">woofir</h1>
    </div>
    <Home />
  </div>
);

export default App;
