import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './newcomment.scss';

const NewComment = ({ timestamp, duration }) => {
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

  const pfp = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Tyler%2C_The_Creator_%288048745695%29_%28cropped%29.jpg/800px-Tyler%2C_The_Creator_%288048745695%29_%28cropped%29.jpg',
    'https://www.onemanagement.com/assets/2019-01-17/61276crystaltillmanportfolioPage12Image0001.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a1/Brent_Faiyaz.jpg',
    'https://thefader-res.cloudinary.com/private_images/w_640,c_limit,f_auto,q_auto:eco/160906_Noname_5552_nigbyu/noname-telefone-interview.jpg',
    'https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/Harrison_Corwin_lje6kl/jpegmafia-veteran-interview.jpg',
    'https://media.resources.festicket.com/www/artists/kali-uchis.jpg',
  ];

  const onSubmit = ({ comment, user }) => {
    const json = {
      time_stamp: Math.floor((timestamp / (duration || 0)) * 100),
      comment,
      user,
      song_id: 1,
      user_pfp: pfp[Math.floor(Math.random() * pfp.length)],
    };

    axios.post('http://localhost:5000/comments', json);
    handleReset();
  };

  return (
    <div style={{ width: '70vw', marginLeft: '5vw', marginTop: '2vh' }}>
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
