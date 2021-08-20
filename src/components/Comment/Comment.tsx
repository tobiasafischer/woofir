import React, { useState } from 'react';
import './comment.scss';

const Comment = ({ offset }) => {
  const [style, setStyle] = useState({ display: 'none' });
  const handleEnter = () => {
    if (offset < 75) setStyle({ display: '' });
    else setStyle({ display: '', marginRight: '5vw' });
  };

  return (
    <div
      style={{ transform: `translateX(${0.68 * offset}vw)` }}
      className="comment-indiv-contain"
      onMouseEnter={(e) => {
        handleEnter();
      }}
      onMouseLeave={(e) => {
        setStyle({ display: 'none' });
      }}
    >
      <div className="comment-img">
        <img
          alt="pfp"
          className="comment-pfp"
          src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
      </div>

      <div style={style} className="comment-txt-container">
        <p id="username">@tobias</p>
        <p id="content">yesgasergseadrgsaergasegasegawsegsaegsaesegsego</p>
      </div>
    </div>
  );
};

export default Comment;

// transform: translateX((timestamp / songlength) * 100)
