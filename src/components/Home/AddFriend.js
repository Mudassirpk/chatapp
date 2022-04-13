import { useState } from "react";

import RequestModel from "./RequestModel";
import "./../../css/Home/AddFriend.css";

function AddFriend() {
  const [open, setOpen] = useState(false);
  function openModel() {
    setOpen(!open);
  }

  return (
    <>
      <div onClick={openModel} className="addfriend__section">
        <p className="addfriend__title">Add Friend</p>
        <span>➕</span>
      </div>
      {open ? <RequestModel toggler={openModel} /> : null}
    </>
  );
}

export default AddFriend;
