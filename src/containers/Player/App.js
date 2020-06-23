import React, { useState, useRef, useEffect, Fragment } from 'react';
import TimeSlider from 'react-input-slider';
import { playlist } from '../../constant/Playlists';
import './App.css';
import Playlist from '../Playlist';

import {
  CaretRightOutlined,
  CaretLeftOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
} from '@ant-design/icons';
import { Typography } from 'antd';

const App = ({ songIndex }) => {
  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);

  // console.log(songIndex);

  useEffect(() => {
    if (duration === currentTime && currentTime !== 0) {
      setAudioIndex((audioIndex + 1) % playlist.length);
      setPlay(true);
    }
  }, [currentTime]);

  const songUpdate = (song) => {
    setAudioIndex(song);
    setPlay(true);
  };

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play();
  };
  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
  };
  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
      setPlay(true);
      audioRef.current.play();
    }
  };
  const Name = 'App-logo';

  return (
    <Fragment>
      <div className="App">
        <div className="App-header">
          <img
            src={playlist[audioIndex].img}
            className={isPlay && Name}
            alt="logo"
            id="logo"
          />
          <Typography.Title level={2} className="Song-Title">
            {playlist[audioIndex].title}
          </Typography.Title>
          <Typography.Paragraph className="Singer">
            {playlist[audioIndex].artist}
          </Typography.Paragraph>
          <div className="li-button" align="center">
            <div
              onClick={() =>
                audioIndex !== 0
                  ? setAudioIndex((audioIndex - 1) % playlist.length)
                  : setAudioIndex(playlist.length - 1)
              }
            >
              <CaretLeftOutlined className="button" />
            </div>
            <div onClick={handlePausePlayClick}>
              {!isPlay ? (
                <PlayCircleOutlined className="button" />
              ) : (
                <PauseCircleOutlined className="button" />
              )}
            </div>
            <div
              onClick={() => setAudioIndex((audioIndex + 1) % playlist.length)}
            >
              <CaretRightOutlined className="button" />
            </div>
          </div>
          <TimeSlider
            axis="x"
            xmax={duration}
            x={currentTime}
            onChange={handleTimeSliderChange}
            styles={{
              track: {
                backgroundColor: '#FCE8CE',
                height: '10px',
              },
              active: {
                backgroundColor: '#263056',
                height: '10px',
              },
              thumb: {
                marginTop: '-3px',
                width: '15px',
                height: '15px',
                backgroundColor: '#333',
                borderRadius: 20,
              },
            }}
          />
          <audio
            ref={audioRef}
            src={playlist[audioIndex].src}
            onLoadedData={handleLoadedData}
            onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
            onEnded={() => setPlay(false)}
          />
        </div>
      </div>
      <div className="playlist">
        <Playlist onSongUpdate={songUpdate} />
      </div>
    </Fragment>
  );
};

export default App;
