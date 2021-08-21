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

  const pfp = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Tyler%2C_The_Creator_%288048745695%29_%28cropped%29.jpg/800px-Tyler%2C_The_Creator_%288048745695%29_%28cropped%29.jpg',
    'https://www.onemanagement.com/assets/2019-01-17/61276crystaltillmanportfolioPage12Image0001.jpg',
    'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU0MDQyNzUyMzgyODA1NzU1/aap-rocky-from-the-film-monster-poses-for-a-portrait-in-the-youtube-x-getty-images-portrait-studio-at-2018-sundance-film-festival-on-january-22-2018-in-park-city-utah-photo-by-robby-klein_getty-images.jpg',
    'https://media.npr.org/assets/img/2020/04/03/thundercat-by-the1point8-6cf23acbf5bf302c3529b471d3901c3b99a10596.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a1/Brent_Faiyaz.jpg',
    'https://thefader-res.cloudinary.com/private_images/w_640,c_limit,f_auto,q_auto:eco/160906_Noname_5552_nigbyu/noname-telefone-interview.jpg',
    'https://pbs.twimg.com/profile_images/1349275365118599168/HlJOXaqc.jpg',
    'https://static.wikia.nocookie.net/epicsmp/images/8/89/RyanMagee.jpg/revision/latest?cb=20210117131306',
    'https://pbs.twimg.com/profile_images/1247656404179021824/5f2tKg_h_400x400.jpg',
    'https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/Harrison_Corwin_lje6kl/jpegmafia-veteran-interview.jpg',
    'https://media.resources.festicket.com/www/artists/kali-uchis.jpg',
  ];

  const onSubmit = ({ comment, user }) => {
    const json = {
      time_stamp: Math.floor(timestamp),
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
