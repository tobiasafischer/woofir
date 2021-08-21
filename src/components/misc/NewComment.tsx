import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './newcomment.scss';

const NewComment = ({ timestamp }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleReset = () => {
    reset(
      {
        comment: '',
        user: '',
      },
      {
        keepErrors: false,
        keepIsValid: true,
      },
    );
  };
  const onSubmit = ({ comment, user }) => {
    const json = {
      time_stamp: Math.floor(timestamp),
      comment,
      user,
      song_id: 1,
      user_pfp:
        'https://www.onemanagement.com/assets/2019-01-17/61276crystaltillmanportfolioPage12Image0001.jpg',
    };

    axios.post('http://localhost:5000/comments', json);
    handleReset();
  };

  return (
    <div style={{ width: '70vw', marginLeft: '5vw' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="app-form-group">
          <input
            className="app-form-control"
            {...register('user', { required: true })}
            placeholder="user"
          />
          {errors.user && <p>Required</p>}
        </div>
        <div className="app-form-group message">
          <input
            className="app-form-control"
            {...register('comment', { required: true })}
            placeholder="comment"
          />
          {errors.comment && <p>Required</p>}
        </div>

        <div className="app-form-group buttons" style={{ marginTop: '4vh' }}>
          <button className="app-form-button" type="submit">
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewComment;
