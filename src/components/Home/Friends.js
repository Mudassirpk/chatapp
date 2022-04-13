import React, { useContext, useState, useEffect } from "react";

import "./../../css/Home/Friends.css";
import { dataContext } from "../../App";

import Friend from "./Friend";

function Friends() {
  const [friends, setFriends] = useState([]);

  const { data } = useContext(dataContext);

  useEffect(() => {
    setFriends(data.friends);
  }, [data.friends]);
  return (
    <div className="friends__section">
      {friends
        ? friends.map((friend, index) => {
            return (
              <Friend email={friend.email} name={friend.name} key={index} />
            );
          })
        : null}
    </div>
  );
}

export default Friends;
