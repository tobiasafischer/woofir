import React from 'react';
import RadioIcon from '@material-ui/icons/Radio';
import './App.scss';
import Home from './Home/Home';

const App = () => (
  <div className="App">
    <div className="logo-container">
      <svg width={0} height={0}>
        <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
          <stop offset={0} stopColor="rgba(241,184,74,1)" />
          <stop offset={1} stopColor="rgba(207,113,8,1)" />
        </linearGradient>
      </svg>
      <RadioIcon sx={{ fill: 'url(#linearColors)' }} />
      <h1 className="logo">woofir</h1>
    </div>
    <Home />
  </div>
);

export default App;
