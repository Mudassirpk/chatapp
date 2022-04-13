import React, {useContext, useState} from "react";
import {Redirect} from "react-router-dom";
// local import
import Form from "../Universal/Form";
import {toggleContext} from "./Register";
import {postRequest} from "./../../Helpers/Request";
import {dataContext} from "./../../App";

function Login() {
  // conditional rendering hooks
  const setFormOption = useContext(toggleContext);
  const Data = useContext(dataContext);
  const [invalidIndicator, setInvalidIndicator] = useState({
    display: "none",
    text: "",
  });
  const [response, setResponse] = useState({
    status: 0,
    data: {},
  });

  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });

  function fillLoginFields(e) {
    const id = e.target.id;
    const value = e.target.value;
    setLoginFields({...loginFields, [id]: value});
  }

  async function submitHandler(e) {
    e.preventDefault();

    const response = await postRequest("/login", loginFields);
    const jsonResponse = await response.json();
    if (response.status === 404) {
      setInvalidIndicator({
        display: "inline",
        text: jsonResponse.error.messege,
      });
    } else {
      setInvalidIndicator({
        display: "none",
        text: "",
      });
      setResponse({
        status: response.status,
        data: jsonResponse,
      });
      Data(jsonResponse);
    }
  }
  if (response.status === 200) {
    return <Redirect to="/home" />;
  } else {
    return (
      <div>
        <Form title="Login">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            onChange={fillLoginFields}
            value={loginFields.email}
            placeholder="Email"
            id="email"
            required
          />
          <label htmlFor="email">Password</label>
          <input
            type="password"
            value={loginFields.password}
            onChange={fillLoginFields}
            id="password"
            placeholder="Password"
            required
          />
          <span style={{display: invalidIndicator.display}}>
            {invalidIndicator.text}
          </span>
          <p onClick={setFormOption} className="toggleaction__option">
            Don't have an account ?
          </p>
          <button onClick={submitHandler}>Login</button>
        </Form>
      </div>
    );
  }
}

export default Login;
