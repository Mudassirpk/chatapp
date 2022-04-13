// local imports
import "./../../css/Home/MessegeBox.css";
import MessegeInput from "./MessegeInput";
import Heading from "./../Universal/Heading";
import MessegeShow from "./MessegeShow";

function MessegeBox() {
  return (
    <section className="messegebox__section">
      <Heading
        customClass="messegebox__heading"
        title="Messeges"
        color="#2d2942"
        background="#d1d4d7"
      />
      <MessegeShow />
      <MessegeInput />
    </section>
  );
}

export default MessegeBox;
