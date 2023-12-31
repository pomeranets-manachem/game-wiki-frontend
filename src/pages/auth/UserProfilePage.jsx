import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  return (
    <div className="uk-container">
      {user &&
        <>
          <h1>Profile</h1>
          <section className="profile-info">
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </section>
        </>
      }
    </div>
  );
}

export default ProfilePage;
