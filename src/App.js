import React, { useState, useRef, useEffect } from 'react';
import Player from './containers/Player/App';
import Playlist from './containers/Playlist';
import Break from 'react-break';
import 'antd/dist/antd.css';

const UIBreakpoints = {
  mobile: 0,
  phablet: 550,
  tablet: 768,
  tabletplus: 770,
};
function App() {
  // const [songIndex, setSongIndex] = useState(0);
  // const updateSong = (song) => {
  //   setSongIndex(song);
  // };

  return (
    <div>
      <Break
        breakpoints={UIBreakpoints}
        query={{ method: 'isAtMost', breakpoint: 'tablet' }}
      >
        <Player />
        <div align="center">
          <Playlist />
        </div>
      </Break>
      <Break
        breakpoints={UIBreakpoints}
        query={{ method: 'isAtLeast', breakpoint: 'tabletplus' }}
      >
        <div className="container">
          <Player />
        </div>
      </Break>
    </div>
  );
}

export default App;
