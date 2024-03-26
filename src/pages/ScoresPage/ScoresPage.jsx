import "./ScoresPage.scss";
import { useLocation } from "react-router-dom";

function ScoresPage() {
  const location = useLocation();
  const { correctQuestions } = location.state;
  console.log(correctQuestions);
  return (
    <section className="scores-pg">
      <div className="scores-pg__heading">
        I am a scores page. This is my score: {correctQuestions}
      </div>
    </section>
  );
}

export default ScoresPage;
