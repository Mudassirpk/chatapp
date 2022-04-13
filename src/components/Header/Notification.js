import {useContext} from "react";
import "./../../css/Header/Notification.css";

import {dataContext} from "./../../App";
import {postRequest} from "./../../Helpers/Request";

function Notification({sender, sideEffect}) {
  const {data, resetData} = useContext(dataContext);
  async function acceptRequest() {
    const response = await postRequest("/acceptrequest", {
      acceptor: data.email,
      nowFriend: sender,
    });

    if (response.status === 200) {
      const acceptor = await response.json();
      resetData(acceptor.savedToAcceptor);
      // reset the request array with updated data in notifications component
      sideEffect(true, sender);
    }
  }

  async function deleteRequest() {
    await postRequest("/deleterequest", {
      actor: data.email,
      sender,
    });
    sideEffect(true, sender);
  }

  return (
    <div className="notification">
      <p className="notification__origin">{sender} sent you friend request</p>
      <div className="response">
        <button onClick={acceptRequest} className="accept">
          Accept
        </button>
        <button className="delete" onClick={deleteRequest}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Notification;
