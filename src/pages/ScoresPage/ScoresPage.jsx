import "./ScoresPage.scss";
import { useLocation, Link } from "react-router-dom";
import celebrate from "../../assets/images/pinata-mrfluff.png";
import study from "../../assets/images/study-mrfluff.png";
import awesome from "../../assets/images/music-mrfluff.png";

function ScoresPage() {
  const location = useLocation();
  const { correctQuestions } = location.state;

  return (
    <section className="scores-pg">
      {correctQuestions === 10 ? (
        <div className="scores-pg__container">
          <h1 className="scores-pg__title">
            Congratulations! You scored {correctQuestions}/ 10! Well done!{" "}
          </h1>
          <img src={awesome} alt="cat playing music" className="scores-pg__image" />
        </div>
      ) : correctQuestions > 6 ? (
        <div className="scores-pg__container">
          <h1 className="scores-pg__title">
            Nice job! You scored {correctQuestions}/ 10!{" "}
          </h1>
          <img src={celebrate} alt="cat celebrating" className="scores-pg__image" />
        </div>
      ) : (
        <div className="scores-pg__container">
          <h1 className="scores-pg__title">
            Time to study harder! You scored {correctQuestions} / 10!{" "}
          </h1>
          <img src={study} alt="cat studying" className="scores-pg__image" />
        </div>
      )}
      <Link className="scores-pg__back" to="/selections">
        Back to Home
      </Link>
    </section>
  );
}

export default ScoresPage;
