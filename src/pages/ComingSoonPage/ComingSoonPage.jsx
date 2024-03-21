import "./ComingSoonPage.scss";
import comingsoon from "../../assets/images/comingsoon-mrfluff.png";
import { Link } from "react-router-dom";

function ComingSoonPage() {
  return (
    <section className="coming-soon">
      <div className="coming-soon__container">
        <h1 className="coming-soon__title">COMING SOON</h1>
        <img src={comingsoon} alt="cat designing a page" className="coming-soon__image" />
      </div>
      <Link className="coming-soon__back" to="/">
        Go back home
      </Link>
    </section>
  );
}

export default ComingSoonPage;
