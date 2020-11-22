import "./App.css";
import SaveComp from "./SaveComp.js";
import React, { useState, useEffect } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [play, setPlay] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timeStamp, setTimeStamp] = useState([]);

  // COUNTER /////////////////////////////////////
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

  /// SEC CONVERTER ////////////////////////////////

  const secConverter = (sec) => {
    let sekunde, minute, sati;

    if (sec >= 3600) {
      sekunde = sec % 60;
      sati = Math.floor(sec / 3600);
      minute = Math.floor(sec / 60) - sati * 60;

      return `${sati}:${minute}:${sekunde}`;
    } else if (sec >= 60) {
      sekunde = sec % 60;
      minute = Math.floor(sec / 60);

      return `${minute}:${sekunde}`;
    } else {
      return `${sec}`;
    }
  };

  /// GRABBING SAVED TIME ///////////////////////
  const timeGrabber = (sec) => {
    let x = secConverter(sec);
    setTimeStamp((arr) => [...arr, x]);
    console.log(timeStamp);
  };

  // SAVIN SELECTED TIME(timestamps) TO LOCAL STORAGE
  const saveToLocal = (e) => {
    //Unpacking
    let time = e.target.innerText;
    let timeS = time.split(":");
    console.log(timeS);
    if (timeS.length > 2) {
      let sec =
        parseInt(timeS[0]) * 3600 +
        parseInt(timeS[1]) * 60 +
        parseInt(timeS[2]);
      console.log(sec);
    } else if (timeS.length > 1) {
      let sec = parseInt(timeS[0]) * 60 + parseInt(timeS[1]);
      console.log(sec);
    } else {
      console.log(timeS);
    }
  };

  /////////////////////////////////////////////////////

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
        <span
          id="delete"
          className="material-icons"
          onClick={() => {
            setSeconds(0);
            setTimeStamp([]);
            setPlay(false);
          }}
        >
          remove_circle
        </span>
        <span className="material-icons" id="folder">
          folder
        </span>
      </div>
      <div className="timeStamps">
        {timeStamp.map((time, index) => (
          <h3 id={index} onClick={saveToLocal}>
            {time}
          </h3>
        ))}
      </div>
    </div>
  );
}

export default App;
