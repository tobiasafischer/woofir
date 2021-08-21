import React, { useState, useEffect } from 'react';
import './comment.scss';

const Comment = ({ offset, user, comment, userPFP, z }) => {
  const [style, setStyle] = useState({ display: 'none', marginRight: '', zIndex: z });
  const handleEnter = () => {
    if (offset < 75) setStyle({ display: '', marginRight: '', zIndex: z });
    else setStyle({ display: '', marginRight: '6vw', zIndex: z });
  };
  useEffect(() => {
    if (offset) console.log(`right: ${0.7 * offset}%`);
  }, []);
  return (
    <div
      style={{ right: `${0.7 * offset}%` }}
      className="comment-indiv-contain"
      onMouseEnter={(e) => {
        handleEnter();
      }}
      onMouseLeave={(e) => {
        setStyle({ display: 'none', marginRight: '', zIndex: z });
      }}
    >
      <div className="comment-img" style={{ zIndex: z }}>
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
