import "./App.css";
import SaveComp from "./SaveComp.js";
import React, { useState, useEffect, Fragment } from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";

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
      }, 100);
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

  ///// Unpacking minutes for saving

  const unPack = (e) => {
    let time = e.target.innerText;
    let timeS = time.split(":");
    console.log(timeS);
    if (timeS.length > 2) {
      console.log("prva");
      return (
        parseInt(timeS[0]) * 3600 + parseInt(timeS[1]) * 60 + parseInt(timeS[2])
      );
    } else if (timeS.length > 1) {
      console.log("druga");
      return parseInt(timeS[0]) * 60 + parseInt(timeS[1]);
    } else {
      console.log("treca");
      return parseInt(timeS);
    }
  };

  // SAVIN SELECTED TIME(timestamps) TO LOCAL STORAGE
  const saveToLocal = (e) => {
    if (window.confirm(`Add timestamp ${e.target.innerText} to database?`)) {
      let timeStampInSeconds = unPack(e);
      console.log(timeStampInSeconds);
      // initial setup
      if (localStorage.getItem("totalTime") === null) {
        localStorage.setItem("totalTime", String(timeStampInSeconds));
      } else {
        let time = parseInt(localStorage.getItem("totalTime"));
        time += timeStampInSeconds;
        localStorage.setItem("totalTime", String(time));
      }
      // Save it!
      window.alert("Timestamp added.");
    } else {
      // Do nothing!
      window.alert("Timestamp dissmised");
    }
  };

  //RETRIVE FROM LOCAL AND RENDER IN Format hours
  const totalAndRender = () => {
    let time = parseInt(localStorage.getItem("totalTime"));
    if (!time) {
      return 0;
    } else {
      return secConverter(time);
    }
  };

  //Clear Total Time
  const clearTotTime = () => {
    if (
      window.confirm(
        "WARNING!!! You will delete ALL time saved in database. Proceed?"
      )
    ) {
      localStorage.clear();
    }
  };

  /////////////////////////////////////////////////////

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Fragment>
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
                  <Link to="/tot">
                    <span className="material-icons" id="folder">
                      folder
                    </span>
                  </Link>
                </div>
                <div className="timeStamps">
                  {timeStamp.map((time, index) => (
                    <h3 key={index} onClick={saveToLocal}>
                      {time}
                    </h3>
                  ))}
                </div>
              </Fragment>
            )}
          />
          <Route
            exact
            path="/tot"
            render={(props) => (
              <Fragment>
                <h2>Total time</h2>
                <p id="total">{totalAndRender()}</p>
                <Link to="/">
                  <span
                    id="folder"
                    className="material-icons"
                    style={{ marginLeft: "25px", marginBottom: "100px" }}
                  >
                    arrow_back
                  </span>
                </Link>
                <span
                  id="clearTotTime"
                  className="material-icons"
                  onClick={clearTotTime}
                >
                  auto_delete
                </span>
              </Fragment>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
