import "./Chatbot.scss";
import mrfluff from "../../assets/images/professor-mrfluff.png";
import axios from "axios";
import { useState, useEffect } from "react";

const { REACT_APP_BACKEND_URL } = process.env;

function Chatbot(props) {
  const [userInput, setUserInput] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { newChat, retrievedThreadId } = props;

  //reset chatbot messages when go to new question id

  useEffect(() => {
    setMessage(null);
  }, [newChat, retrievedThreadId]);

  const getMessages = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (!message) {
        let questionWithOptions = newChat.text;
        if (newChat.options) {
          questionWithOptions +=
            " Options are: " +
            newChat.options.map((option) => option.text).join(", ") +
            " Can you explain the question and go through each option?";
        }
        const chatbotResponse = await axios.post(`${REACT_APP_BACKEND_URL}/message`, {
          threadId: retrievedThreadId,
          message: questionWithOptions,
        });
        setMessage(chatbotResponse.data.conversation.reverse());
        console.log(message);
      } else if (userInput) {
        const chatbotResponse = await axios.post(`${REACT_APP_BACKEND_URL}/message`, {
          threadId: retrievedThreadId,
          message: userInput,
        });

        setMessage(chatbotResponse.data.conversation.reverse());
        setUserInput("");
        console.log(message);
      } else {
        alert("Please enter a question!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="chatbot">
      <form className="chatbot__form" onSubmit={getMessages}>
        <div className="chatbot__messages">
          {isLoading && <div className="chatbot__loading">Loading messages...</div>}
          {!isLoading &&
            message?.map((chatMessage, index) => (
              <li className="chatbot__message-item" key={index}>
                {chatMessage}
              </li>
            ))}
        </div>
        <input
          type="text"
          className="chatbot__input"
          placeholder="Click 'Ask' to get an explanation or type a question here"
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
