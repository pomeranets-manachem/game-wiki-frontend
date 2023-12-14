import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Logo from "../assets/Logo.png"
import Text from "../assets/Text.png"

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (

    <nav className="uk-navbar-container uk-margin-bottom">
      <div className="uk-container">
        <div uk-navbar="true">
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li className="">
                <Link to="/" className="">
                  <img src={Logo} alt="Page logo" className="nav-logo" />
                  <img src={Text} alt="Page logo" className="nav-logo" />
                </Link>
              </li>
              <li className="">
                <Link to="/categories" className="">
                  Categories
                </Link>
              </li>
              <li className="">
                <Link to="/games" className="">
                  Games
                </Link>
              </li>
              <li className="">
                <Link to="/games/create">
                  <button type="submit" className="uk-button uk-button-primary navbar-create-game-btn">Create game</button>
                </Link>
              </li>
            </ul>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              {!isLoggedIn && (
                <li className="">
                  <Link to="/login" className="">
                    Login
                  </Link>
                </li>
              )}

              {isLoggedIn && (
                <li className="nav-user">
                  <a className="" href="#" id="" uk-icon="icon: user">{user && user.username}</a>
                  <div className="uk-navbar-dropdown">
                    <ul className="uk-nav uk-navbar-dropdown-nav">
                      <li>
                        <Link to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <a href="" onClick={logOutUser}>Logout</a>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav >
  );
}

export default Navbar;
