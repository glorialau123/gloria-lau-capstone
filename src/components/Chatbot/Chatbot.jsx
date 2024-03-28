import "./Chatbot.scss";
import mrfluff from "../../assets/images/professor-mrfluff.png";
import axios from "axios";
import { useState, useEffect } from "react";

const { REACT_APP_BACKEND_URL } = process.env;

function Chatbot() {
  const [userInput, setUserInput] = useState(null);
  const getMessages = async (event) => {
    event.preventDefault();
    try {
      const getThreadResponse = await axios.get(`${REACT_APP_BACKEND_URL}/thread`);
      const retrievedThreadId = getThreadResponse.data.threadId;
      console.log(retrievedThreadId);

      const chatbotResponse = await axios.post(`${REACT_APP_BACKEND_URL}/message`, {
        threadId: retrievedThreadId,
        message: userInput,
        // });
      });
      const singleMessages = chatbotResponse.data.conversation.map((msg) => msg);
      console.log(singleMessages);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userInput);

  return (
    <section className="chatbot">
      <form className="chatbot__form" onSubmit={getMessages}>
        <div className="chatbot__messages">Chat messages displayed here</div>
        <input
          type="text"
          className="chatbot__input"
          placeholder="Type your question here"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        />
        <div className="chatbot__button-container">
          <img src={mrfluff} alt="professor cat" className="chatbot__image" />
          <button className="chatbot__button">Ask!</button>
        </div>
      </form>
    </section>
  );
}

export default Chatbot;
