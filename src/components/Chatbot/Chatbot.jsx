import "./Chatbot.scss";
import mrfluff from "../../assets/images/professor-mrfluff.png";
import axios from "axios";
import { useState, useEffect } from "react";

const { REACT_APP_BACKEND_URL } = process.env;

function Chatbot(props) {
  const [userInput, setUserInput] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const { newChat, setNewChat } = props;

  const getMessages = async (event) => {
    event.preventDefault();
    try {
      const getThreadResponse = await axios.get(`${REACT_APP_BACKEND_URL}/thread`);
      const retrievedThreadId = getThreadResponse.data.threadId;
      console.log(retrievedThreadId);

      const chatbotResponse = await axios.post(`${REACT_APP_BACKEND_URL}/message`, {
        threadId: retrievedThreadId,
        message: userInput,
      });
      // const singleMessages = chatbotResponse.data.conversation.map((msg) => msg);
      // console.log(singleMessages);

      setMessage(chatbotResponse.data.conversation.reverse());
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };

  //console.log(userInput);

  //set previous messages
  // useEffect(() => {
  //   console.log(newChat, userInput, message);
  //   if (userInput && message) {
  //     setPreviousChats((prevChats) => ({ ...prevChats, message }));
  //   }
  // }, [newChat]);
  // console.log(previousChats);

  return (
    <section className="chatbot">
      <form className="chatbot__form" onSubmit={getMessages}>
        <ul className="chatbot__messages">
          {message?.map((chatMessage, index) => (
            <li className="chatbot__message-item" key={index}>
              {chatMessage}
            </li>
          ))}
        </ul>
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
