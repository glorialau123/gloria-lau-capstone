import "./QuestionPage.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const { REACT_APP_BACKEND_URL } = process.env;

function QuestionPage() {
  const params = useParams();
  let questionId = parseInt(params.id);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [correctQuestions, setCorrectQuestions] = useState(0);

  //implement right/wrong logic
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const getSingleQuestion = async function () {
      try {
        const response = await axios.get(
          `${REACT_APP_BACKEND_URL}/topic/review/${questionId}`
        );
        console.log(response.data);
        setSelectedQuestion(response.data);
        setSelectedOption(null);
      } catch (error) {
        console.error(error);
      }
    };
    getSingleQuestion();
  }, [questionId]);

  //handle next question and change URL
  const navigate = useNavigate();

  function handlePreviousQuestion() {
    if (selectedQuestion.id <= 10) {
      const newQuestionId = questionId - 1;
      console.log(newQuestionId);
      navigate(`/topic/review/${newQuestionId}`);
      setSelectedOption(null);
    }
  }

  function handleNextQuestion() {
    if (selectedQuestion.id >= 1 && selectedQuestion.id < 10) {
      const newQuestionId = questionId + 1;
      console.log(newQuestionId);
      navigate(`/topic/review/${newQuestionId}`);
      setSelectedOption(null);
    } else {
      navigate(`/topic/review/1`); //need to handle logic for last page - which includes passing the final score from the counting score functionality to be added
      setSelectedOption(null);
    }
  }

  //handle click on an option/answer
  function handleAnswerClick() {
    console.log("I am clicked");
    console.log(selectedQuestion.options[1].isCorrect);
    if (selectedQuestion.options[1].isCorrect) {
      console.log("(in if part) this is correct");
      setSelectedOption(true);
      console.log(selectedOption);
      //need to track if question has been answered already. If answered, the count shouldn't increase again.
      setCorrectQuestions((prevCorrectQuestions) => prevCorrectQuestions + 1);

      console.log("number of correctQuestions", correctQuestions);
    } else {
      console.log("this is wrong");
      setSelectedOption(false);
      console.log("(in else part) correct answer?", selectedOption);
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
          <p className="question-pg__number">`Question {selectedQuestion?.id}`</p>
          <p className="question-pg__current-score">{correctQuestions}/10 correct</p>
        </div>

        <div className="question-pg__question-container">
          <p className="question-pg__question">{selectedQuestion?.text}</p>
        </div>
        <div className="question-pg__options-container">
          {/* options: if the first condition is evaluated to be false, then the second condition "selectedOption!==null && selectedQuestion.options[1].isCorrect === false" is evaluated */}
          {selectedQuestion?.options?.map((option) => {
            return (
              <div
                className={`question-pg__option ${
                  selectedOption !== null && option.isCorrect === true
                    ? "question-pg__option--correct"
                    : selectedOption !== null && option.isCorrect === false
                    ? "question-pg__option--wrong"
                    : ""
                }`}
                onClick={handleAnswerClick}
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

          <button className="question-pg__button" onClick={handleNextQuestion}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default QuestionPage;
