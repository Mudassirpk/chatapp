import {useEffect, useContext, useState} from "react";
import Notification from "./Notification";

import {dataContext} from "./../../App";

const Notifications = ({notificationCount}) => {
  const {socket, data} = useContext(dataContext);
  const [requests, setRequests] = useState([]);

  function resetRequests(_condition, email) {
    if (_condition === true) {
      const newRequests = requests.filter((request) => {
        return request.sender !== email;
      });
      setRequests(newRequests);
    }
  }

  socket.on("requestresponse", (response) => {
    if (requests.length === 0) {
      setRequests([
        {
          sender: response.sender,
          accepted: false,
        },
      ]);
    } else {
      setRequests([
        ...requests,
        {
          sender: response.sender,
          accepted: false,
        },
      ]);
    }
  });

  async function initialRender() {
    const fReqeusts = await data.friendRequest;
    setRequests(fReqeusts);
    notificationCount(data.friendRequest.length);
  }

  useEffect(() => {
    initialRender();
  }, [initialRender]);

  return (
    <div className="notifications">
      {requests && requests.length !== 0
        ? requests.map((request, index) => {
          return request.accepted === false ? (
            <Notification
              key={index}
              sender={request.sender}
              sideEffect={resetRequests}
            />
          ) : null;
        })
        : null}
    </div>
  );
};

export default Notifications;
