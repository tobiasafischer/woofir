import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './comment.scss';
import Comment from './Comment';

const CommentContainer = (props: { duration: number }) => {
  const { duration } = props;
  const [comments, setComments] = useState(null);
  const [tiles, setTiles] = useState(null);

  useEffect(() => {
    if (comments) {
      const arr = [];
      const sort = comments.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
      let counter = 0;
      sort.forEach((comment) => {
        const offset = (comment.time_stamp / duration) * 100;
        console.log(comment.time_stamp, duration);
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

  useEffect(() => {
    axios
      .get('http://localhost:5000/comments', {
        params: {
          song_id: 1,
        },
      })
      .then((res) => {
        setComments(res.data.comments);
      });
  }, []);

  return <div className="comment-container">{tiles}</div>;
};

export default CommentContainer;

// transform: translateX((timestamp / songlength) * 100)
