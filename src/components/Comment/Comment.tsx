import React, { useState } from 'react';
import './comment.scss';

const Comment = ({ offset, user, comment, userPFP, z }) => {
  const [style, setStyle] = useState({ display: 'none', zIndex: z });
  const handleEnter = () => {
    if (offset > 75) setStyle({ display: '', zIndex: z });
    else setStyle({ display: '', zIndex: z });
  };
  return (
    <div
      style={{ left: `${offset > 75 ? offset - 5 : offset}%` }}
      className="comment-indiv-contain"
      onMouseEnter={() => {
        handleEnter();
      }}
      onMouseLeave={() => {
        setStyle({ display: 'none', zIndex: z });
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
