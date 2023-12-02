import './App.css';
// import Header from './components/Header/header'
import Controls from './components/Controls/controls'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import { Switch } from 'react-router-dom';
import TimerDisplay from './components/TimerDisplay/timerdisplay'
import Button from './components/Button/button'
import Settings from './components/Settings/settings'
import { useState, useEffect } from 'react';
import useSound from 'use-sound'
import timesUpSfx from './sounds/timesUp.mp3'
import backgroundImage from './img/bg3.jpg'; // Import your background image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import MotivationalQuotes from './components/MotivationalQuotes/MotivationalQuotes';
import ReactPlayer from 'react-player';
import bgMusic from './music/bgmusic.mp3';
// import axios from 'axios';
import Documentation from './Pages/Documentation';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import Switch from 'react-router-dom/';


// import SpotifyIntegration from './components/SpotifyIntegration/SpotifyIntegration';
// import SpotifyWebApi from 'spotify-web-api-node';


// const spotifyApi = new SpotifyWebApi({
//   clientId: '9adc9badc8ea41e0b9e147f973fda522',
//   clientSecret: 'd03476c942664e9cbce1fe22a9a7d25d',
//   redirectUri: ' http://localhost:3000'
// });

// spotifyApi.setAccessToken('');


function App() {
  const [settingsVisible, setSettingsVisible] = useState(false)
  const [timerMode, setTimerMode] = useState('pomo')   
  const [pomoLength, setPomoLength] = useState(25)
  const [shortLength, setShortLength] = useState(3)
  const [longLength, setLongLength] = useState(15)
  const [fontPref, setFontPref] = useState('kumbh')         
  const [accentColor, setAccentColor] = useState('default') 
  const [secondsLeft, setSecondsLeft] = useState(pomoLength * 60)
  const [isActive, setIsActive] = useState(false)
  const [buttonText, setButtonText] = useState('START')
  const [volume, setVolume] = useState(1)
  const [timesUp] = useSound(timesUpSfx, {
    volume: volume,
  });
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  const toggleMusic = () => {
    setIsMusicPlaying((prevState) => !prevState);
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem('timerSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setTimerMode(parsedSettings.timerMode || 'pomo');
      setPomoLength(parsedSettings.pomoLength || 25);
      setShortLength(parsedSettings.shortLength || 3);
      setLongLength(parsedSettings.longLength || 15);
    }
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response1 = await axios.get('https://api.openweathermap.org/data/2.5/weather');
    
  
  //       console.log(response1.data);
       
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const timerSettings = {
      timerMode,
      pomoLength,
      shortLength,
      longLength,
      setIsActive,
      buttonText,
      setButtonText,
      volume,
    };
    localStorage.setItem('timerSettings', JSON.stringify(timerSettings));
  }, [timerMode, pomoLength, shortLength, longLength]);


  useEffect(() => {
    const backgroundMusic = new Audio(bgMusic);
    backgroundMusic.volume = 0.5;
    backgroundMusic.loop = true;

    if (isMusicPlaying) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
    return () => {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    };
  }, [isMusicPlaying]);

  const pausePlayButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '1000',

  };
  


  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSecondsLeft(secondsLeft => secondsLeft - 1)
      }, 1000)

      if (secondsLeft === 0) {
        clearInterval(interval)
        setIsActive(false)
        setButtonText('')
        timesUp()
      }

      return () => clearInterval(interval)
    }

  }, [isActive, secondsLeft, timesUp]);

  // const documentationButtonStyle = {
  //   position: 'fixed',
  //   bottom: '50px', // Adjust as needed
  //   right: '20px',
  //   zIndex: '1000',
  // };

  const toggleSettingsVisibility = (event) => {
    setSettingsVisible(!settingsVisible)
  }

  const formatTimeLeft = (seconds) => {
    return (`${Math.floor(seconds / 60)}:${(seconds % 60 > 9)
      ? seconds % 60
      : '0' + seconds % 60
      }`)
  }

  const calcPercentage = () => {
    if (timerMode === 'pomo') {
      return ((secondsLeft / (pomoLength * 60)) * 100)
    }
    if (timerMode === 'short') {
      return ((secondsLeft / (shortLength * 60)) * 100)
    }
    if (timerMode === 'long') {
      return ((secondsLeft / (longLength * 60)) * 100)
    }

  }



  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw', 
    height: '100vh', 
    overflow: 'hidden', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '20px', 
    color: 'white',
  };

  return (
    // <Router>
      <div className="pomodoro-app" style={backgroundStyle}>
        <ReactPlayer
          url={bgMusic} 
          playing
          loop
          volume={0.5} 
        />
        <FontAwesomeIcon
          icon={faPencilAlt}
          className="icon-top-left"
        />
        <MotivationalQuotes />

        <Controls
          timerMode={timerMode}
          setTimerMode={setTimerMode}
          setSecondsLeft={setSecondsLeft}
          pomoLength={pomoLength}
          shortLength={shortLength}
          longLength={longLength}
          setIsActive={setIsActive}
          buttonText={buttonText}
          setButtonText={setButtonText}
          volume={volume}
        />
        <TimerDisplay
          timerMode={timerMode}
          percentage={calcPercentage()}
          timeLeft={formatTimeLeft(secondsLeft)}
          isActive={isActive}
          setIsActive={setIsActive}
          buttonText={buttonText}
          setButtonText={setButtonText}
          volume={volume}
          setVolume={setVolume}
        />
        <Button type="settings" toggleVisibility={toggleSettingsVisibility} />
        <Settings visible={settingsVisible}
          toggleSettingsVisibility={toggleSettingsVisibility}
          pomoLength={pomoLength}
          setPomoLength={setPomoLength}
          shortLength={shortLength}
          setShortLength={setShortLength}
          longLength={longLength}
          setLongLength={setLongLength}
          fontPref={fontPref}
          setFontPref={setFontPref}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
          closeSettings={toggleSettingsVisibility}
          setSecondsLeft={setSecondsLeft}
          timerMode={timerMode}
        />
        <div style={pausePlayButtonStyle}>
          {isMusicPlaying ? (
            <button onClick={toggleMusic}>Pause Music</button>
          ) : (
            <button onClick={toggleMusic}>Play Music</button>
          )}
        </div>
        {/* Documentation Button */}
        {/* <Link to="/Documentation" style={documentationButtonStyle}>
          <Button>Documentation</Button>
        </Link>
       <Switch>
          <Route path="/Documentation">
            <Documentation />
          </Route> */}
        {/* </Switch>  */}
      </div>
 );
}
export default App;