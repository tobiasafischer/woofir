import React from 'react';
import './comment.scss';
import Comment from './Comment';

const CommentContainer = () => {
  console.log(1);
  return (
    <div className="comment-container">
      <Comment offset={3} />
      <Comment offset={1} />
      <Comment offset={2} />
    </div>
  );
};

export default CommentContainer;

// transform: translateX((timestamp / songlength) * 100)
