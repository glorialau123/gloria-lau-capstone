import "./QuestionPage.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Chatbot from "../../components/Chatbot/Chatbot";

const { REACT_APP_BACKEND_URL } = process.env;

function QuestionPage() {
  //state variables to pass down to chatbot:
  const [newChat, setNewChat] = useState([]);
  const [retrievedThreadId, setRetrievedThreadId] = useState("");

  //to use for question/answer section
  const params = useParams();
  let questionId = parseInt(params.id); //to use for navigation and URL

  //to use for routing to different topics
  let topicName = params.topicname;

  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [questionStatus, setQuestionStatus] = useState({}); //to set a question status to remember if the question has been answered already
  const [isOptionSelected, setIsOptionSelected] = useState(false); //to disable next button if no option selected

  //implement right/wrong logic
  const [selectedOption, setSelectedOption] = useState(null);

  //implement pulsing animation state for correct questions
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPulseAnimation(false);
    }, 2000);
  }, [correctQuestions]);

  useEffect(() => {
    const getSingleQuestion = async function () {
      try {
        const response = await axios.get(
          `${REACT_APP_BACKEND_URL}/topic/${topicName}/${questionId}`
        );
        setSelectedQuestion(response.data);
        setNewChat(response.data);
        setSelectedOption(null);
      } catch (error) {
        console.error(error);
      }
    };
    getSingleQuestion();
  }, [questionId, topicName]);

  //get thread id and pass to chatbot component
  useEffect(() => {
    const getThread = async function () {
      try {
        const getThreadResponse = await axios.get(
          `${REACT_APP_BACKEND_URL}/chatbot/thread`
        );
        setRetrievedThreadId(getThreadResponse.data.threadId);
      } catch (error) {
        console.error(error);
      }
    };
    getThread();
  }, [questionId]);

  //handle next question and change URL
  const navigate = useNavigate();

  function handlePreviousQuestion() {
    if (questionId > 1) {
      const newQuestionId = questionId - 1;
      navigate(`/topic/${topicName}/${newQuestionId}`);
      setIsOptionSelected(questionStatus[newQuestionId] === true);
    }
  }

  function handleNextQuestion() {
    if (questionId >= 1 && questionId < 10) {
      const newQuestionId = questionId + 1;
      navigate(`/topic/${topicName}/${newQuestionId}`);
      setSelectedOption(null);
      setIsOptionSelected(questionStatus[newQuestionId] === true);
    }
    if (questionId === 10) {
      navigate(`/topic/${topicName}/score`, {
        state: { correctQuestions: correctQuestions },
      });
    }
  }

  //handle click on an option/answer
  function handleAnswerClick(option) {
    if (option.isCorrect === true && !questionStatus[questionId]) {
      setSelectedOption(true);
      //to track if question has been answered already. If answered, the count shouldn't increase again. Use questionId as key in questionStatus object.
      setQuestionStatus((previousStatus) => ({ ...previousStatus, [questionId]: true }));
      setIsOptionSelected(true);
      setCorrectQuestions((prevCorrectQuestions) => prevCorrectQuestions + 1);
      setPulseAnimation(true);
    } else if (option.isCorrect === false && !questionStatus[questionId]) {
      setQuestionStatus((previousStatus) => ({ ...previousStatus, [questionId]: true }));
      setSelectedOption(false);
      setIsOptionSelected(true);
    }
  }

  return (
    <section className="question-pg">
      <div className="question-pg__main">
        {topicName === "atomictheory" && (
          <h1 className="question-pg__topic">Atomic Theory</h1>
        )}
        {topicName === "ioniccompounds" && (
          <h1 className="question-pg__topic">Ionic Compounds</h1>
        )}
        {topicName === "balancing" && (
          <h1 className="question-pg__topic">Balancing Equations</h1>
        )}
        {topicName === "types" && (
          <h1 className="question-pg__topic">Types of Reactions</h1>
        )}
        {topicName === "acidbase" && (
          <h1 className="question-pg__topic">Acids and Bases</h1>
        )}
        {topicName === "review" && <h1 className="question-pg__topic">Unit Review</h1>}
        <div className="question-pg__heading">
          <p className="question-pg__number">Question {selectedQuestion?.id}</p>
          <p
            className={`question-pg__current-score ${
              pulseAnimation ? "question-pg__current-score--animate" : ""
            }`}
          >
            {correctQuestions}/10 correct
          </p>
        </div>

        <div className="question-pg__question-container">
          <p className="question-pg__question">{selectedQuestion?.text}</p>
        </div>
        <div className="question-pg__options-container">
          {selectedQuestion?.options?.map((option) => {
            let optionClassName = "question-pg__option";
            if (selectedOption !== null) {
              if (option.isCorrect === true) {
                optionClassName = optionClassName + " question-pg__option--correct";
              } else if (option.isCorrect === false) {
                optionClassName = optionClassName + " question-pg__option--wrong";
              }
            } else if (questionStatus[selectedQuestion.id]) {
              if (option.isCorrect === true) {
                optionClassName = optionClassName + " question-pg__option--correct";
              } else if (option.isCorrect === false) {
                optionClassName = optionClassName + " question-pg__option--wrong";
              }
            }

            return (
              <div
                key={option.id}
                className={optionClassName}
                onClick={() => {
                  handleAnswerClick(option);
                }}
              >
                {option.text}
              </div>
            );
          })}
        </div>
        <div className="question-pg__buttons-container">
          {selectedQuestion.id > 1 ? (
            <button
              className="question-pg__button question-pg__button--left"
              onClick={handlePreviousQuestion}
            >
              Previous
            </button>
          ) : (
            ""
          )}

          <button
            className="question-pg__button"
            onClick={handleNextQuestion}
            disabled={!isOptionSelected}
          >
            Next
          </button>
        </div>
      </div>
      <Chatbot newChat={newChat} retrievedThreadId={retrievedThreadId} />
    </section>
  );
}

export default QuestionPage;
