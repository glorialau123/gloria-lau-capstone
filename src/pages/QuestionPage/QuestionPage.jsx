import "./QuestionPage.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const { REACT_APP_BACKEND_URL } = process.env;

function QuestionPage() {
  const params = useParams();
  let questionId = parseInt(params.id);
  console.log(questionId);

  const [selectedQuestion, setSelectedQuestion] = useState({});

  useEffect(() => {
    const getSingleQuestion = async function () {
      try {
        const response = await axios.get(
          `${REACT_APP_BACKEND_URL}/topic/review/${questionId}`
        );
        console.log(response.data);
        setSelectedQuestion(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSingleQuestion();
  }, [questionId]);

  //handle next question and change URL
  const navigate = useNavigate();

  function handleNextQuestion() {
    if (selectedQuestion.id >= 1 && selectedQuestion.id < 10) {
      const newQuestionId = questionId + 1;
      console.log(newQuestionId);
      navigate(`/topic/review/${newQuestionId}`);
    } else {
      navigate(`/topic/review/1`);
    }
  }

  return (
    <section className="question-pg">
      <div className="question-pg__main">
        <h1 className="question-pg__topic">Unit Review</h1>
        <div className="question-pg__heading">
          <p className="question-pg__number">`Question {selectedQuestion?.id}`</p>
          <p className="question-pg__current-score">0/10 correct</p>
        </div>

        <div className="question-pg__question-container">
          <p className="question-pg__question">{selectedQuestion?.text}</p>
        </div>
        <div className="question-pg__options-container">
          <div className="question-pg__options">
            {selectedQuestion &&
              selectedQuestion.options &&
              selectedQuestion.options[0] && (
                <div className="question-pg__option">
                  {selectedQuestion.options[0].text}
                </div>
              )}
            {selectedQuestion &&
              selectedQuestion.options &&
              selectedQuestion.options[1] && (
                <div className="question-pg__option">
                  {selectedQuestion.options[1].text}
                </div>
              )}
          </div>
          <div className="question-pg__options">
            {selectedQuestion &&
              selectedQuestion.options &&
              selectedQuestion.options[2] && (
                <div className="question-pg__option">
                  {selectedQuestion.options[2].text}
                </div>
              )}
            {selectedQuestion &&
              selectedQuestion.options &&
              selectedQuestion.options[3] && (
                <div className="question-pg__option">
                  {selectedQuestion.options[3].text}
                </div>
              )}
          </div>
        </div>
        <div className="question-pg__buttons-container">
          <button className="question-pg__button question-pg__button--left">
            Previous
          </button>
          <button className="question-pg__button" onClick={handleNextQuestion}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default QuestionPage;
