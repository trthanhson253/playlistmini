import React from 'react';
import { playlist } from '../../constant/Playlists';
import TagAudio from '../../components/Info';
import './index.css';

const index = ({ onSongUpdate }) => {
  const openSong = (index) => {
    onSongUpdate(index);
    // console.log(handleSongPlay);
  };
  return (
    <div className="playlist">
      {playlist.map((audio, index) => {
        return (
          <div onClick={() => openSong(index)} style={{ cursor: 'pointer' }}>
            <TagAudio index={index + 1} img={audio.img} title={audio.title} />
          </div>
        );
      })}
    </div>
  );
};

export default index;
