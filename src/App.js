import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);

  const [play, setPlay] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (play) {
      const id = window.setInterval(() => {
        setSeconds((sec) => sec + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      window.clearInterval(intervalId);
    }
  }, [play]);

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

  return (
    <div className="App">
      <h1>{secConverter(seconds)}</h1>

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
            ? { color: "green", boxShadow: "0px 0px 50px 2px rgb(34, 116, 14)" }
            : { color: "red", boxShadow: "0px 0px 50px 2px red" }
        }
      >
        {!play ? "play_circle_outline" : "stop"}
      </span>
    </div>
  );
}

export default App;
