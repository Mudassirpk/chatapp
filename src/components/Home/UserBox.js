import { useState } from "react";

import "./../../css/Home/UserBox.css";

// local imports
import Heading from "./../Universal/Heading";
import Friends from "./Friends";
import AddFriend from "./AddFriend";

function UserBox() {
  const [openFriends, setOpenFriends] = useState(true);

  function toggleFriends() {
    setOpenFriends(!openFriends);
  }

  return (
    <section className="userbox__section">
      <Heading
        customClass="friend__heading"
        title={"Friends"}
        color={"#2d2942"}
        background={"#d1d4d7"}
      >
        <span onClick={toggleFriends}>{!openFriends ? "⤋" : "⤊"}</span>
      </Heading>
      {openFriends ? (
        <>
          <AddFriend />
          <Friends />
        </>
      ) : null}
    </section>
  );
}

export default UserBox;
