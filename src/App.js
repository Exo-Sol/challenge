import "./App.css";
import SaveComp from "./SaveComp.js";
import React, { useState, useEffect } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [play, setPlay] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timeStamp, setTimeStamp] = useState([]);

  // COUNTER
  useEffect(() => {
    if (play) {
      const id = window.setInterval(() => {
        setSeconds((sec) => sec + 1);
      }, 100);
      setIntervalId(id);
    } else {
      window.clearInterval(intervalId);
    }
  }, [play]);

  /// SEC CONVERTER

  const secConverter = (sec) => {
    let sekunde, minute, sati;

    if (sec >= 3600) {
      sekunde = sec % 60;
      sati = Math.floor(sec / 3600);
      minute = Math.floor(sec / 60) - sati * 60;

      return `${sati} : ${minute} : ${sekunde}`;
    } else if (sec >= 60) {
      sekunde = sec % 60;
      minute = Math.floor(sec / 60);

      return `${minute} : ${sekunde}`;
    } else {
      return ` ${sec}`;
    }
  };

  /// GRABBING SAVED TIME
  const timeGrabber = (sec) => {
    let x = secConverter(sec);
    setTimeStamp((arr) => [...arr, x]);
    console.log(timeStamp);
  };

  return (
    <div className="App">
      <h1>{secConverter(seconds)}</h1>
      <div className="buttons">
        <span
          className="material-icons"
          id="play"
          onClick={() => {
            play === true ? setPlay(false) : setPlay(true);
            console.log(play);
            console.log("clicked");
          }}
          style={
            !play
              ? {
                  color: "rgb(44, 233, 76)",
                  boxShadow: "0px 0px 30px 2px rgb(44, 233, 76)",
                }
              : { color: "red", boxShadow: "0px 0px 30px 2px red" }
          }
        >
          {!play ? "play_arrow" : "stop"}
        </span>
        <SaveComp sec={seconds} passFunc={timeGrabber} />
      </div>
      <div className="timeStamps">
        {timeStamp.map((time) => (
          <h3>{time}</h3>
        ))}
      </div>
    </div>
  );
}

export default App;
