import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SelectionsPage from "./pages/SelectionsPage/SelectionsPage";
import ComingSoonPage from "./pages/ComingSoonPage/ComingSoonPage";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import ScoresPage from "./pages/ScoresPage/ScoresPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<SelectionsPage />} />
          <Route path="/topic/comingsoon" element={<ComingSoonPage />} />
          <Route path="/topic/review/:id" element={<QuestionPage />} />
          <Route path="/topic/review/score" element={<ScoresPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
