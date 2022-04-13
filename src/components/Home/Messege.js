import "./../../css/Home/Messege.css";

function Messege({ side, content, img }) {
  return (
    <div className={`messegeone__section ${side}`}>
      <div className="messege__container">
        <div className="sender__img">
          <img src={img} alt="" />
        </div>
        <div className="messege__content">
          <p className="contentpara">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default Messege;
