import React, { useContext, useState } from "react";

// local import
import Form from "../Universal/Form";
import { toggleContext } from "./Register";
import { postRequest } from "./../../Helpers/Request";

function SignUp({redirectToLogin}) {
  const [confirmation,setConfirmation] = useState(false)

  // conditional rendring hooks
  const [duplicate, setDuplicate] = useState(false);
  const [matchIndicator, setMatchIndicator] = useState(false);

  const setFormOption = useContext(toggleContext);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    conpassword: "",
  });

  function storeFormFields(e) {
    const id = e.target.id;
    const value = e.target.value;
    setFormFields({ ...formFields, [id]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (formFields.password === formFields.conpassword) {
      // if passwords are matched on another attemp disappear error span
      setMatchIndicator(false);

      const response = await postRequest("/signup", {
        name: formFields.name,
        email: formFields.email,
        password: formFields.password,
      });

      // checking if given email is already in use
      if (response === "403") {
        setDuplicate(true);
      } else if(response.status === 201){
        setDuplicate(false);
        setConfirmation(true)
      }
    } else {
      setMatchIndicator(true);
    }
  }

  return (
    <div className="signup__section">
      {!confirmation?<Form title="Sign Up">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={formFields.name}
          id="name"
          placeholder="Name"
          onChange={storeFormFields}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={formFields.email}
          id="email"
          placeholder="Email"
          onChange={storeFormFields}
        />
        <span
          style={{ display: !duplicate ? "none" : "inline" }}
          className="duplicate"
        >
          ** Email already in use
        </span>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={formFields.password}
          id="password"
          placeholder="Password"
          onChange={storeFormFields}
        />
        <span
          style={{ display: !matchIndicator ? "none" : "inline" }}
          className="matchindicator"
        >
          ** Password not matching
        </span>
        <label htmlFor="conpassword">Confirm Password</label>
        <input
          type="password"
          id="conpassword"
          placeholder="Confirm Password"
          value={formFields.conPassword}
          onChange={storeFormFields}
        />
        <p onClick={setFormOption} className="toggleaction__option">
          Already have an account ?
        </p>
        <button onClick={submitHandler}>Sign Up</button>
      </Form>:
      <div className="confirmation">
        <h1>Account create successfully</h1>
        <button onClick={()=>redirectToLogin(true)}>Go to Login</button>
      </div>}
    </div>
  );
}

export default SignUp;
