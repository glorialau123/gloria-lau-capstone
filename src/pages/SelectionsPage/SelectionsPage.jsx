import "./SelectionsPage.scss";
import { Link } from "react-router-dom";
import chemistrymrfluff from "../../assets/images/chemistry-mrfluff.png";

function SelectionsPage() {
  return (
    <section className="selections">
      <div className="selections__title-container">
        <h1 className="selections__title">Science 10 Chemistry with Mr. Fluff</h1>

        <img
          src={chemistrymrfluff}
          alt="cat doing chemistry"
          className="selections__image"
        />
      </div>
      <div className="selections__topics">
        <Link className="selections__topic-link" to="/topic/comingsoon">
          <div className="selections__topic selections__topic--1">
            <h2 className="selections__subtitle">Atomic Theory</h2>
          </div>
        </Link>

        <Link className="selections__topic-link" to="/topic/comingsoon">
          <div className="selections__topic selections__topic--2">
            <h2 className="selections__subtitle">Ionic Compounds</h2>
          </div>
        </Link>

        <Link className="selections__topic-link" to="/topic/comingsoon">
          <div className="selections__topic selections__topic--3">
            <h2 className="selections__subtitle">Balancing Equations</h2>
          </div>
        </Link>

        <Link className="selections__topic-link" to="/topic/comingsoon">
          <div className="selections__topic selections__topic--2">
            <h2 className="selections__subtitle">Types of Reactions</h2>
          </div>
        </Link>

        <Link className="selections__topic-link">
          <div className="selections__topic selections__topic--3">
            <h2 className="selections__subtitle" to="/topic/comingsoon">
              Acids and Bases
            </h2>
          </div>
        </Link>

        <Link className="selections__topic-link" to="/topic/review">
          <div className="selections__topic selections__topic--1">
            <h2 className="selections__subtitle">Unit Review</h2>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default SelectionsPage;
