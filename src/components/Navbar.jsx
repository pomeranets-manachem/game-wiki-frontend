import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <Link to="/" className="navbar-brand">
        Home
      </Link>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav ml-auto">
          {isLoggedIn && (
            <>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{user && user.username}</a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <div className="dropdown-item">
                    <Link to="/profile">
                      Profile
                    </Link>
                  </div>
                  <div className="dropdown-item">
                    <a href="" onClick={logOutUser}>Logout</a>
                  </div>
                </div>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <li className="nav-item">
              <>
                {/* dont think we need an extra signup link since the login page displays it
                <Link to="/signup" className="nav-item nav-link">
                  Sign Up
                </Link> */}
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </>
            </li>
          )}
        </ul >
      </div>
    </nav>
  );
}

export default Navbar;
