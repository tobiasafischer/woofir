import React, { useState } from 'react';
import './comment.scss';

const Comment = ({ offset }) => {
  const [style, setStyle] = useState({ display: 'none' });
  return (
    <div
      style={{ transform: `translateX(${offset}px)` }}
      className="comment-indiv-contain"
      onMouseEnter={(e) => {
        setStyle({ display: '' });
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

      <div className="comment">
        <div style={style}>ss</div>
      </div>
    </div>
  );
};

export default Comment;

// transform: translateX((timestamp / songlength) * 100)
