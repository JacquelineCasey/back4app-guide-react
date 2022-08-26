
import { useEffect, useState } from "react";

import logo from './logo.svg';
import './App.css';
import IncrementButton from './components/IncrementButton';
import Timer from './components/Timer';

function calculateColor(proportion) {
  const [low_red, low_green, low_blue] = [35, 50, 66];
  const [high_red, high_green, high_blue] = [190, 40, 105];
  const [r, g, b] = 
    [(high_red - low_red) * proportion + low_red,
    (high_green - low_green) * proportion + low_green,
    (high_blue - low_blue) * proportion + low_blue].map(Math.floor);

  return [r, g, b];
}


function App() {
  const [started, setStarted] = useState(false);
  const [clicks, updateClicks] = useState(0);
  const [time, updateTime] = useState(Date.now());
  const [startTime, updateStartTime] = useState(Date.now());

  useEffect(() => {
    updateStartTime(Date.now);
    updateTime(Date.now)
  }, [started])

  const seconds = Math.floor((time - startTime) / 10) / 100;
  const speed = clicks/seconds;
  const speed_target = 8;
  let clamped_speed = Math.max(Math.min(speed_target, speed), 0);
  if (!clamped_speed)
    clamped_speed = 0;

  const [r, g, b] = calculateColor(clamped_speed/speed_target * Math.min(seconds, 2) / 2);

  return (
    <div className="App" style={{
      backgroundColor: `rgb(${r}, ${g}, ${b})`
    }}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <IncrementButton count={clicks} updateCount={ (c) => {
          setStarted(true);
          updateClicks(c);
        } 
        }/>
        <Timer time={time} updateTime={updateTime} active={started} startTime={startTime}/>
        {(clicks && time) 
          ? <label>Speed: {Math.round(clicks / seconds * 100) / 100} clicks per second</label> 
          : <label>Speed:</label>
        }
        <button onClick={()=> {
          setStarted(false);
          updateClicks(0);
        }}>RESET</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
