import React from "react";
import "./../../css/Universal/Form.css";
function Form({children, title, customClass}) {
  return (
    <div className={`universal__form ${customClass}`} >
      <form>
        <h1>{title}</h1>
        {children}
      </form>
    </div >
  );
}

export default Form;
