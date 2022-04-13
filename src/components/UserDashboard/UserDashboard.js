import { useState, useContext } from "react";
import "./../../css/UserDashboard/UserDashboard.css";

import Form from "./../Universal/Form";
import { postRequest } from "./../../Helpers/Request";
import { dataContext } from "./../../App";

function UserDashboard() {
  const data = useContext(dataContext);
  const [indicator, setIndicator] = useState({
    display: "none",
    text: "",
  });
  const [successIndicator, setSuccessIndicator] = useState({
    display: "none",
    text: "",
  });
  const [profileData, setProfileData] = useState({
    name: "",
    oldPassword: "",
    newPassword: "",
  });
  function fillProfileFields(e) {
    const name = e.target.name;
    const value = e.target.value;
    setProfileData({ ...profileData, [name]: value });
  }

  async function updateProfile(e) {
    e.preventDefault();
    const response = await postRequest(
      "/updateprofile",
      { info: profileData, id: data._id },
      JSON.parse(localStorage.getItem("userSec")).token
    );
    const jsonResponse = await response.json();
    if (response.status === 404) {
      setIndicator({
        display: "inline",
        text: jsonResponse.error.messege,
      });
    } else if (response.status === 200) {
      setSuccessIndicator({
        display: "inline",
        text: "Password changed successfuly",
      });
    }
  }
  return (
    <section className="userdashboard__section">
      <div className="dashboard__container">
        <div className="show__section">
          <div className="user__details">
            <div className="user__img">
              <img alt="" />
            </div>
            <div className="information">
              <p className="name">Mskhan</p>
              <p className="email">mudassir.pk.mp@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="edit__section">
          <Form title="Edit Profile" customClass="dashboard__form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              onChange={fillProfileFields}
              name="name"
              value={profileData.name}
            />
            <label htmlFor="email">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              onChange={fillProfileFields}
              value={profileData.oldPassword}
            />

            <span
              style={{
                display: indicator.display,
              }}
              className="oldPassword__indicator"
            >
              {indicator.text}
            </span>

            <label htmlFor="email">New Password</label>
            <input
              type="password"
              name="newPassword"
              onChange={fillProfileFields}
              value={profileData.newPassword}
            />
            <span
              style={{
                display: successIndicator.display,
                color: "lightgreen",
                background: "#2d2942",
                padding: "1rem",
                borderRadius: ".5rem",
              }}
            >
              {successIndicator.text}
            </span>
            <button onClick={updateProfile}>Submit</button>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default UserDashboard;
