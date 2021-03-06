import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import axios from 'axios';
import CommentContainer from '../Comment/CommentContainer';
import PlayButton from '../misc/PlayButton';
import { useInterval } from './useInterval';
import NewComment from '../misc/NewComment';
import './waveform.scss';

//styling of waveform
const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: '#eee',
  progressColor: '#Eb736c',
  cursorColor: '#b1b3be',
  barWidth: 4,
  barRadius: 3,
  responsive: true,
  height: 100,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

const Waveform = () => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [sec, setSec] = useState(0);
  const [duration, setDuration] = useState(null);
  const [url, setUrl] = useState(
    'https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3',
  );
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/comments', {
        params: {
          song_id: url,
        },
      })
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch(() => setComments([]));
  }, [url]);

  // second timer
  useInterval(() => {
    if (playing) setSec(wavesurfer.current.getCurrentTime());
  }, 1000);

  const handleClick = () => {
    // onclick of waveform changes the time to the current time
    setTimeout(() => {
      setSec(wavesurfer.current.getCurrentTime());
    }, 100);
  };

  // initialization
  useEffect(() => {
    setPlay(false);
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url);
    wavesurfer.current.on('ready', function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
        setDuration(wavesurfer.current.getDuration());
      }
    });
    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const secTommss2 = (sec) => {
    return new Date(sec * 1000).toUTCString().split(' ')[4].substr(3);
  };

  return (
    <div style={{ width: '100%' }}>
      <div className="audio-container">
        <PlayButton handlePlay={handlePlayPause} playing={!playing} />
        <div className="waveform-wrapper">
          <div ref={waveformRef} className="waveform" onClick={handleClick} />
        </div>
        <audio id="track" src={url} />
      </div>
      <div className="under-wave-container">
        <p style={{ marginTop: '-1.8vh', width: '20vh' }}>{`${secTommss2(sec)} / ${secTommss2(
          Math.round(duration),
        )}`}</p>
      </div>
      <div className="comment-wrapper-container">
        <CommentContainer comments={comments} song={url} />
      </div>
      <NewComment
        url={url}
        timestamp={Math.floor(sec)}
        duration={Math.floor(duration)}
        setComments={setComments}
        setUrl={setUrl}
      />
    </div>
  );
};

export default Waveform;
