import "./Chatbot.scss";
import mrfluff from "../../assets/images/professor-mrfluff.png";

function Chatbot() {
  return (
    <section className="chatbot">
      <div className="chatbot__container">
        <div className="chatbot__messages">Chat messages displayed here</div>
        <input
          type="text"
          className="chatbot__input"
          placeholder="Type your question here"
        />
        <div className="chatbot__button-container">
          <img src={mrfluff} alt="professor cat" className="chatbot__image" />
          <button className="chatbot__button">Ask!</button>
        </div>
      </div>
    </section>
  );
}

export default Chatbot;
