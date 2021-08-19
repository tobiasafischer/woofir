// not made by me https://medium.com/trackstack/simple-audio-waveform-with-wavesurfer-js-and-react-ae6c0653b240
import styled from 'styled-components';

export const WaveformContianer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 50vw;
  background: transparent;
  overflow: hidden;
`;

export const Wave = styled.div`
  width: 100%;
  height: 90px;
  overflow: hidden;
`;

export const PlayButton = styled.button`
  font-family: 'Overpass', sans-serif;
  text-transform: lowercase;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: #efefef;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  padding-bottom: 3px;
  &:hover {
    background: #ddd;
  }
  overflow: hidden;
`;
