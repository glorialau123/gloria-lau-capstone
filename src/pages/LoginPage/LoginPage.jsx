import "./LoginPage.scss";
import teaching from "../../assets/images/teaching-mrfluff.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!userName && !password) {
      alert("Please enter a username and password!");
    } else if (!userName && password) {
      alert("Please enter a username!");
    } else if (userName && !password) {
      alert("Please enter a password!");
    } else {
      navigate("/selections");
    }
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div className="login__container">
        <h1 className="login__title">Science with Mr.Fluff</h1>
        {/* <h1 className="login__title">Science with Mr.Fluff</h1> */}
        <img src={teaching} alt="cat designing a page" className="login__image" />
      </div>
      <div className="login__inputs">
        <div className="login__area">
          <label htmlFor="username" className="login__label">
            Username:
          </label>
          <input
            name="username"
            type="text"
            className="login__input"
            placeholder="username"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className="login__area">
          <label htmlFor="password" className="login__label">
            Password:
          </label>
          <input
            name="password"
            type="password"
            className="login__input"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
      </div>
      <button className="login__button">Login</button>
    </form>
  );
}

export default LoginPage;
