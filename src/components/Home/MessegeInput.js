import {useContext, useState} from "react";
import "./../../css/Home/MessegeInput.css";

import {dataContext} from "./../../App";
import {messegeContext} from "./Home";

function MessegeInput() {
  const {updateMessegeData, specificFriend} = useContext(messegeContext);

  const {socket, data} = useContext(dataContext);
  const [messegeText, setMessegeText] = useState("");

  function fillText(e) {
    setMessegeText(e.target.value);
  }

  function sendMessege(e) {
    e.preventDefault();
    updateMessegeData({
      email: data.email,
      messegeText: messegeText,
    });
    socket.emit("chat", {
      senderEmail: data.email,
      recieverEmail: specificFriend.email,
      messegeText: messegeText,
    });

    setMessegeText("");
  }

  return (
    <section className="messegeinput__section">
      <form className="messegeinput__form">
        <textarea
          value={messegeText}
          onChange={fillText}
          name="messege"
          id="messege"
          placeholder="Messege"
        ></textarea>
        {specificFriend ? (
          <button onClick={sendMessege} className="btn btn-send">
            Send
          </button>
        ) : (
          <button disabled onClick={sendMessege} className="btn btn-send">
            Send
          </button>
        )}
      </form>
    </section>
  );
}

export default MessegeInput;
