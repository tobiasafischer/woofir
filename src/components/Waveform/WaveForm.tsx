import React, { useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';

import PlayButton from '../misc/PlayButton';
import './waveform.scss';

const WaveformContianer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 50vw;
  background: transparent;
`;

const Waveform = () => {
  const [playing, setPlaying] = useState(false);
  const [waveform, setWaveform] = useState();

  useEffect(() => {
    setWaveform(
      WaveSurfer.create({
        barWidth: 3,
        cursorWidth: 1,
        container: '#waveform',
        backend: 'WebAudio',
        height: 80,
        progressColor: '#2D5BFF',
        responsive: true,
        waveColor: '#EFEFEF',
        cursorColor: 'transparent',
      }),
    );
  }, []);

  useEffect(() => {
    if (waveform) {
      const track = document.querySelector('#track');
      waveform.load(track);
    }
  }, [waveform]);

  const handlePlay = () => {
    setPlaying((playing) => !playing);
    waveform.playPause();
  };
  const url = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';

  return (
    <WaveformContianer>
      <PlayButton handlePlay={handlePlay} playing={playing} />
      <div id="waveform" />
      <audio id="track" src={url} />
    </WaveformContianer>
  );
};

export default Waveform;
