import React, {useContext, useState, useEffect} from "react";

import "./../../css/Home/Friends.css";
import {dataContext} from "../../App";

import Friend from "./Friend";
import cimg from "./../../images/check.png";

function Friends() {
  const [friends, setFriends] = useState([]);

  const {data} = useContext(dataContext);

  useEffect(() => {
    setFriends(data.friends);
  }, [data.friends]);
  return (
    <div className="friends__section">
      {friends
        ? friends.map((friend, index) => {
          return (
            <Friend
              email={friend.email}
              name={friend.name}
              img={cimg}
              key={index}
            />
          );
        })
        : null}
    </div>
  );
}

export default Friends;
