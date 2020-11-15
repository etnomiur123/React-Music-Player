import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import "./styles/app.scss";
import data from "./util";

function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Library
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        isPlaying={isPlaying}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        src={currentSong.audio}
        ref={audioRef}
      ></audio>
    </div>
  );
}

export default App;
