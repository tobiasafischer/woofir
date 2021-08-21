import React, { useEffect, useState } from 'react';
import './comment.scss';
import Comment from './Comment';

const CommentContainer = ({ comments }) => {
  const [tiles, setTiles] = useState(null);

  useEffect(() => {
    console.log(comments);
    if (comments) {
      const arr = [];
      const sort = comments.sort((a, b) => (a.time_stamp > b.time_stamp ? 1 : -1));
      let counter = 0;
      sort.forEach((comment) => {
        const offset = Math.round(comment.time_stamp - 5);
        arr.push(
          <Comment
            key={comment._id.$oid}
            user={comment.user}
            userPFP={comment.user_pfp}
            comment={comment.comment}
            offset={offset}
            z={counter}
          />,
        );
        counter += 1;
      });
      setTiles(arr);
    }
  }, [comments]);

  return <div className="comment-container">{tiles}</div>;
};

export default CommentContainer;
