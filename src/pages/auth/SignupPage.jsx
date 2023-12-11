import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUserName = (e) => setUserName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, username };

    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="uk-container SignupPage">
      <h1>Sign Up</h1>
      <div className="form-container">
        <form onSubmit={handleSignupSubmit}>
          <div class="uk-margin">
            <label>Email:</label>
            <input className="uk-input" type="email" name="email" value={email} onChange={handleEmail} />
          </div>

          <div class="uk-margin">
            <label>Password:</label>
            <input
              className="uk-input"
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </div>

          <div class="uk-margin">
            <label>Username:</label>
            <input className="uk-input" type="text" name="name" value={username} onChange={handleUserName} />
          </div>

          <button type="submit" className="uk-button uk-button-primary">Sign Up</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Already have account? <Link to={"/login"}> Login</Link></p>

      </div>
    </div>
  );
}

export default SignupPage;
