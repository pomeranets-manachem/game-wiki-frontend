import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="uk-container LoginPage">
      <h1>Login</h1>
      <div className="form-container uk-width-medium">
        <form onSubmit={handleLoginSubmit}>
          <div className="uk-margin">
            <label>Email:</label>
            <input className="uk-input" type="email" name="email" value={email} onChange={handleEmail} />
          </div>

          <div className="uk-margin">
            <label>Password:</label>
            <input
              className="uk-input"
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </div>

          <button type="submit" className="uk-button uk-button-primary">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Don't have an account yet? <Link to={"/signup"}> Sign Up</Link></p>

      </div>
    </div>
  );
}

export default LoginPage;
