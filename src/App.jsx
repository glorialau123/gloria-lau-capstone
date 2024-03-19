import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="header__logo">
          <h1 className="header__title">SCIENCE WITH MR.FLUFF</h1>
        </div>
        <div className="header__login">
          <h1 className="header__name">Welcome User</h1>
        </div>
      </header>
      <section className="selections">
        <div className="selections__title-container">
          <h1 className="selections__title">Science 10 Chemistry with Mr. Fluff</h1>
        </div>
        <div className="selections__topics">
          <div className="selections__topic selections__topic--1">
            <h2 className="selections__subtitle">Atomic Theory</h2>
          </div>

          <div className="selections__topic selections__topic--2">
            <h2 className="selections__subtitle">Ionic Compounds</h2>
          </div>
          <div className="selections__topic selections__topic--3">
            <h2 className="selections__subtitle">Balancing Equations</h2>
          </div>
          <div className="selections__topic selections__topic--2">
            <h2 className="selections__subtitle">Types of Reactions</h2>
          </div>
          <div className="selections__topic selections__topic--3">
            <h2 className="selections__subtitle">Acids and Bases</h2>
          </div>
          <div className="selections__topic selections__topic--1">
            <h2 className="selections__subtitle">Unit Review</h2>
          </div>
        </div>
      </section>
      {/* <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route />
        </Routes>
        <Footer />
      </BrowserRouter> */}
      Testing
    </div>
  );
}

export default App;
