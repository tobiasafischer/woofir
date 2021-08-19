import { SettingsCellSharp } from '@material-ui/icons';
import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

import PlayButton from '../misc/PlayButton';
import './waveform.scss';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

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
  useInterval(() => {
    if (playing) setSec(wavesurfer.current.getCurrentTime());
  }, 1000);
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

  const handleClick = () => {
    setTimeout(() => {
      setSec(wavesurfer.current.getCurrentTime());
    }, 100);
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
      <p style={{ width: '20vh' }}>{`${secTommss2(sec)} / ${secTommss2(Math.round(duration))}`}</p>
    </div>
  );
};

export default Waveform;
