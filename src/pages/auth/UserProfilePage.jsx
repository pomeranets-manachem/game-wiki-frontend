import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user &&
        <>
          <h1>Profile page</h1>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </>
      }
    </div>
  );
}

export default ProfilePage;
