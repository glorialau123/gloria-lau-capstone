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
  let questionId = parseInt(params.id); //use for navigation and URL
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [questionStatus, setQuestionStatus] = useState({}); // need to set a question status to remember if the question has been answered already
  const [isOptionSelected, setIsOptionSelected] = useState(false); //need to disable next button if no option selected

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
          `${REACT_APP_BACKEND_URL}/topic/review/${questionId}`
        );
        console.log(response.data);
        setSelectedQuestion(response.data);
        setNewChat(response.data);
        setSelectedOption(null);
      } catch (error) {
        console.error(error);
      }
    };
    getSingleQuestion();
  }, [questionId]);

  //get thread id and pass to chatbot component
  useEffect(() => {
    const getThread = async function () {
      try {
        const getThreadResponse = await axios.get(
          `${REACT_APP_BACKEND_URL}/chatbot/thread`
        );
        setRetrievedThreadId(getThreadResponse.data.threadId);
        console.log(retrievedThreadId);
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
      console.log(newQuestionId);
      navigate(`/topic/review/${newQuestionId}`);
      setIsOptionSelected(questionStatus[newQuestionId] === true);
    }
  }

  function handleNextQuestion() {
    if (questionId >= 1 && questionId < 10) {
      const newQuestionId = questionId + 1;
      console.log(newQuestionId);
      navigate(`/topic/review/${newQuestionId}`);
      setSelectedOption(null);
      setIsOptionSelected(questionStatus[newQuestionId] === true);
    }
    if (questionId === 10) {
      navigate(`/topic/review/score`, { state: { correctQuestions: correctQuestions } });
    }
  }

  //handle click on an option/answer
  function handleAnswerClick(option) {
    console.log("I am clicked");
    if (option.isCorrect === true && !questionStatus[questionId]) {
      console.log("(in if part) this is correct");
      setSelectedOption(true);
      //need to track if question has been answered already. If answered, the count shouldn't increase again. Use questionId as key in questionStatus object.
      setQuestionStatus((previousStatus) => ({ ...previousStatus, [questionId]: true }));
      setIsOptionSelected(true);
      setCorrectQuestions((prevCorrectQuestions) => prevCorrectQuestions + 1);
      setPulseAnimation(true);
    } else if (option.isCorrect === false && !questionStatus[questionId]) {
      setQuestionStatus((previousStatus) => ({ ...previousStatus, [questionId]: true }));
      setSelectedOption(false);
      setIsOptionSelected(true);
      console.log("this is wrong");
    }
  }

  useEffect(() => {
    console.log("number of correctQuestions", correctQuestions);
  }, [correctQuestions]);

  return (
    // change to components afterwards
    <section className="question-pg">
      <div className="question-pg__main">
        <h1 className="question-pg__topic">Unit Review</h1>
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
          {/* options: if the first condition is evaluated to be false, then the second condition "selectedOption!==null && selectedQuestion.options[1].isCorrect === false" is evaluated */}
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
      {/* need new div here for chatbot - click to toggle and display?; need to do "flex", "column" on section div for mobile */}
      {/* need toggle functionality; modal?? */}
      <Chatbot newChat={newChat} retrievedThreadId={retrievedThreadId} />
    </section>
  );
}

export default QuestionPage;
