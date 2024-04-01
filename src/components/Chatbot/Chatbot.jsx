import "./Chatbot.scss";
import mrfluff from "../../assets/images/professor-mrfluff.png";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const { REACT_APP_BACKEND_URL } = process.env;

function Chatbot(props) {
  const [userInput, setUserInput] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { newChat, retrievedThreadId } = props;
  const goToMessageEndRef = useRef(null);

  //to reset chatbot messages when go to new question id
  useEffect(() => {
    setMessage(null);
  }, [newChat, retrievedThreadId]);

  useEffect(() => {
    //if the component has rendered and ref is attached to a DOM element, ie. not null, then call the scroll method to scroll to the bottom of the chatbot container where the div with the ref attribute is
    if (goToMessageEndRef.current) {
      goToMessageEndRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [message]);

  const getMessages = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (!userInput) {
        let questionWithOptions = newChat.text;
        if (newChat.options) {
          questionWithOptions +=
            " Options are: " +
            newChat.options.map((option) => option.text).join(", ") +
            ". Can you explain the question and go through each option briefly?";
        }
        const chatbotResponse = await axios.post(
          `${REACT_APP_BACKEND_URL}/chatbot/message`,
          {
            threadId: retrievedThreadId,
            message: questionWithOptions,
          }
        );
        setMessage(chatbotResponse.data.conversation.reverse());
      } else if (userInput) {
        const chatbotResponse = await axios.post(
          `${REACT_APP_BACKEND_URL}/chatbot/message`,
          {
            threadId: retrievedThreadId,
            message: userInput,
          }
        );

        setMessage(chatbotResponse.data.conversation.reverse());
        setUserInput("");
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
          {!message ? (
            <div className="chatbot__unsubmitted-container">
              <p className="chatbot__unsubmitted-placeholder">Chat messages shown here</p>
            </div>
          ) : (
            message?.map((chatMessage, index) => (
              <li
                className={`chatbot__message-item ${
                  chatMessage.includes("Mr. Fluff:")
                    ? "chatbot__message-item--assistant"
                    : ""
                }`}
                key={index}
              >
                {chatMessage}
              </li>
            ))
          )}
          {isLoading && <p className="chatbot__loading">Loading messages...</p>}
          <div className="chatbot__ref-location" ref={goToMessageEndRef} />
        </div>

        <textarea
          type="text"
          className="chatbot__input"
          placeholder="Click the 'Ask' button to get an explanation or start typing a question here"
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
