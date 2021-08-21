import React, { useState } from 'react';
import './comment.scss';

const Comment = ({ offset, user, comment, userPFP }) => {
  const [style, setStyle] = useState({ display: 'none', marginRight: '' });
  const handleEnter = () => {
    if (offset < 75) setStyle({ display: '', marginRight: '' });
    else setStyle({ display: '', marginRight: '' });
  };
  console.log(offset);
  return (
    <div
      style={{ transform: `translateX(${0.68 * offset}vw)` }}
      className="comment-indiv-contain"
      onMouseEnter={(e) => {
        handleEnter();
      }}
      onMouseLeave={(e) => {
        setStyle({ display: 'none', marginRight: '' });
      }}
    >
      <div className="comment-img">
        <img alt="pfp" className="comment-pfp" src={userPFP} />
      </div>

      <div style={style} className="comment-txt-container">
        <p id="username">{user}</p>
        <p id="content">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;

// transform: translateX((timestamp / songlength) * 100)
