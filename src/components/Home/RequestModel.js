import { useState, useContext } from "react";

import "./../../css/Home/RequestModel.css";
import Heading from "./../Universal/Heading";
import Form from "./../Universal/Form";
import { postRequest } from "./../../Helpers/Request";
import { dataContext } from "./../../App";

function RequestModel({ toggler }) {
  const { data, socket } = useContext(dataContext);
  const [content, setContent] = useState(false);
  const [requestValidation, setRequestValidation] = useState({
    display: "none",
    textContent: " ",
  });
  const [requestEmail, setRequestEmail] = useState("");
  function fillRequestEmail(e) {
    setRequestEmail(e.target.value);
  }

  async function sendRequest(e) {
    e.preventDefault();
    if (requestEmail === data.email) {
      setRequestValidation({
        display: "inline",
        textContent: "You cannot send request to yourself",
      });
    } else {
      socket.emit("friendrequest", {
        senderId: socket.id,
        sender: data.email,
        requestEmail: requestEmail,
      });
      const response = await postRequest("/friendrequest", {
        requestEmail,
        sender: data.email,
      });
      const jsonResponse = await response.json();
      if (response.status === 404 || response.status === 400) {
        setRequestValidation({
          display: "inline",
          textContent: jsonResponse.error.messege,
        });
      } else if (response.status === 200) {
        setContent(true);
      }
    }
  }

  return (
    <div className="requestmodel">
      <div className="model__container">
        <Heading
          customClass="model__heading"
          title="Send Rquest"
          color="#2d2942"
          background="white"
        >
          <span onClick={toggler}>❌</span>
        </Heading>
        <Form customClass="requestform">
          {!content ? (
            <>
              <label htmlFor="sendto">Email</label>
              <input
                type="text"
                id="sendto"
                placeholder="Email"
                onChange={fillRequestEmail}
                value={requestEmail}
              />
              <span
                style={{ display: requestValidation.display }}
                className="sameemail__warning"
              >
                {requestValidation.textContent}
              </span>
              <button onClick={sendRequest}>Send Request</button>
            </>
          ) : (
            <h2 className="confirmation_head">Request sent successfuly</h2>
          )}
        </Form>
      </div>
    </div>
  );
}

export default RequestModel;
