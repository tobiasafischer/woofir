import React from 'react';
import './comment.scss';
import Comment from './Comment';

const CommentContainer = () => {
  console.log(1);
  return (
    <div className="comment-container">
      <Comment offset={50} />
      <Comment offset={100} />
      <Comment offset={0} />
    </div>
  );
};

export default CommentContainer;

// transform: translateX((timestamp / songlength) * 100)
