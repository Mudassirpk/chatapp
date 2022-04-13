import React, {useState, useContext} from "react";

import "./../../css/Home/Home.css";

import {dataContext} from "./../../App";
import UserBox from "./UserBox";
import MessegeBox from "./MessegeBox";

import {postRequest} from "./../../Helpers/Request";

export const messegeContext = React.createContext();

function Home() {
  const {socket, data} = useContext(dataContext);
  const [specificFriend, setSpecificFriend] = useState("");
  const [messegeData, setMessegeData] = useState([]);

  socket.on("response", (response) => {
    if (specificFriend !== null && specificFriend.length !== 0) {
      if (response.email === data.email) {
        response.side = "sender";
      } else {
        response.side = "reciever";
      }
      updateMessegeData(response);
    }
  });

  function updateMessegeData(inputMessege) {
    if (Array.isArray(messegeData)) {
      setMessegeData([...messegeData, inputMessege]);
    } else {
      setMessegeData([inputMessege]);
    }
  }

  async function fillMesseges(friendEmail) {
    const response = await postRequest(
      "/friendsdata",
      {email: data.email},
      JSON.parse(localStorage.getItem("userSec")).token
    );
    const jsonResponse = await response.json();
    const foundFriend = jsonResponse.find(
      (friend) => friend.email === friendEmail
    );
    setSpecificFriend(foundFriend ? foundFriend : null);
    setMessegeData(
      foundFriend && foundFriend.messeges ? foundFriend.messeges : null
    );
  }

  return (
    <main className="home__section">
      <messegeContext.Provider
        value={{messegeData, fillMesseges, updateMessegeData, specificFriend}}
      >
        <UserBox />
        <MessegeBox />
      </messegeContext.Provider>
    </main>
  );
}

export default Home;
