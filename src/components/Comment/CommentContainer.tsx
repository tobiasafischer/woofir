import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './comment.scss';
import Comment from './Comment';

const CommentContainer = ({ duration }) => {
  const [comments, setComments] = useState(null);
  const [tiles, setTiles] = useState(null);

  useEffect(() => {}, [comments]);

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
