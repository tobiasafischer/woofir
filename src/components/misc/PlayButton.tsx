/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import './playbutton.scss';

const PlayButton = ({ handlePlay, playing }) => (
  <div className="container">
    <div
      onClick={handlePlay}
      className={`btn ${playing ? 'play' : 'pause'}`}
      onKeyDown={handlePlay}
    >
      <span className="bar bar-1" />
      <span className="bar bar-2" />
    </div>
  </div>
);

export default PlayButton;

// https://twitter.com/MDesignsuk
