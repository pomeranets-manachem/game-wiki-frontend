import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="">
      <Link to="/" className="">
        Home
      </Link>
      <div className="" id="">
        <ul className="">
          {isLoggedIn && (
            <>
              <li className="">
                <a className="" href="#" id="">{user && user.username}</a>
                <div className="">
                  <div className="">
                    <Link to="/profile">
                      Profile
                    </Link>
                  </div>
                  <div className="">
                    <a href="" onClick={logOutUser}>Logout</a>
                  </div>
                </div>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <li className="">
              <>
                <Link to="/login" className="">
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
