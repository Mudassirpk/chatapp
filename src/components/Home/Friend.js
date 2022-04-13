import { useContext } from "react";

import "./../../css/Home/Friend.css";

import { messegeContext } from "./Home";

function Friend({ email, name, lastlog, status, img }) {
  const { fillMesseges } = useContext(messegeContext);
  console.log(email);
  function aquireFriend(email) {
    fillMesseges(email);
    console.log(email);
  }

  return (
    <div onClick={() => aquireFriend(email)} className="friend">
      <div className="friend__img">
        <img src={img} alt="friend" />
      </div>
      <div className="friend__details">
        <p className="friend__name">{name}</p>
        <p className="lastlog">{lastlog}</p>
      </div>
    </div>
  );
}

export default Friend;
