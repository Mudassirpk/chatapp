import { useEffect, useRef, useContext } from "react";

import "./../../css/Home/MessegeShow.css";
import Messege from "./Messege";

import { messegeContext } from "./Home";

function MessegeShow() {
  const { messegeData, specificFriend } = useContext(messegeContext);
  const scrollRef = useRef(null);
  function checkScroll() {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    checkScroll();
  }, [messegeData]);
  return (
    <div
      onClick={checkScroll}
      className={`messegeshow__section ${
        messegeData && messegeData.length === 0 ? "nul__messeges" : null
      } `}
    >
      {messegeData && messegeData.length !== 0 ? (
        messegeData.map((messege, index) => {
          return (
            <Messege
              side={messege.side}
              content={messege.messegeText}
              key={index}
            />
          );
        })
      ) : (
        <h1>
          {!specificFriend
            ? "Click on any friend in friend section to Chat"
            : "No chat"}
        </h1>
      )}
      <div ref={scrollRef} />
    </div>
  );
}

export default MessegeShow;
