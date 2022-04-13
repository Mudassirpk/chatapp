import React, {useState} from "react";

import SignUp from "./SignUp";

import "./../../css/Register/Register.css";
import Login from "./Login";

export const toggleContext = React.createContext();

function Register() {
  const [registerToggle, setRegisterToggle] = useState(false);

  function setFormOption(option) {
    setRegisterToggle(!registerToggle)
  }

  return (
    <toggleContext.Provider value={setFormOption}>
      <div className="register__page">
        {!registerToggle ? (
          <SignUp redirectToLogin={setFormOption} />
        ) : (
          <Login />
        )}
      </div>
    </toggleContext.Provider>
  );
}

export default Register;
