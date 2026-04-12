import { useAuth } from "../../hooks/useAuth";
import { authSignOut } from "../../services/auth";

function Dashboard() {
  const auth = useAuth();
  const handleLogout = async () => {
    await authSignOut();
    auth.setUser(null);
  };

  return (
    <div>
      Dashboard{" "}
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
