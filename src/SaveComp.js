import React from "react";
import "./App.css";

const SaveComp = ({ sec, passFunc }) => {
  const clickSave = () => {
    passFunc(sec);
  };

  return (
    <div>
      <span id="save" className="material-icons" onClick={clickSave}>
        note_add
      </span>
    </div>
  );
};

export default SaveComp;
