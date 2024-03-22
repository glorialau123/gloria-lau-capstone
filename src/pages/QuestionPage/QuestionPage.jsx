import "./QuestionPage.scss";
import { useParams } from "react-router-dom";

function QuestionPage() {
  const params = useParams();
  let questionId = params.id;
  console.log(questionId);
  return (
    <section className="question-pg">
      <div className="question-pg__main">
        <h1 className="question-pg__topic">Unit Review</h1>
        <div className="question-pg__heading">
          <p className="question-pg__number">Question number</p>
          <p className="question-pg__current-score">0/10 correct</p>
        </div>

        <div className="question-pg__question-container">
          <p className="question-pg__question">This is a question</p>
        </div>
        <div className="question-pg__options-container">
          <div className="question-pg__options">
            <div className="question-pg__option">Answer 1</div>
            <div className="question-pg__option">Answer 2</div>
          </div>
          <div className="question-pg__options">
            <div className="question-pg__option">Answer 3</div>
            <div className="question-pg__option">Answer 4</div>
          </div>
        </div>
        <div className="question-pg__buttons-container">
          <button className="question-pg__button question-pg__button--left">
            Previous
          </button>
          <button className="question-pg__button">Next</button>
        </div>
      </div>
    </section>
  );
}

export default QuestionPage;
