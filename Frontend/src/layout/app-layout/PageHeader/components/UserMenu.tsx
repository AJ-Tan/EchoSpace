import { useEffect } from "react";
import LogoutIcon from "../../../../components/Icons/LogoutIcon";
import "./userMenuStyles.css";
import { authSignOut } from "../../../../services/auth";
import { useAuth } from "../../../../hooks/useAuth";
import { useDisplay } from "../../../../hooks/useDisplay";

function UserMenu({ toggleUserMenu }: { toggleUserMenu: () => void }) {
  const { setUser } = useAuth();
  const { setDisplayItem } = useDisplay();

  useEffect(() => {
    const handler = () => {
      toggleUserMenu();
    };

    const timeout = setTimeout(() => {
      window.addEventListener("click", handler);
    }, 0);

    return () => {
      window.removeEventListener("click", handler);
      clearTimeout(timeout);
    };
  }, [toggleUserMenu]);

  const handleLogout = async () => {
    const data = await authSignOut();
    if (data.ok) {
      setUser(null);
      setDisplayItem(data.message);
    } else {
      setDisplayItem(data.message, false);
    }
  };

  return (
    <div className="user-menu">
      <ul className="user-menu-list">
        <li>
          <button type="button" onClick={handleLogout}>
            <LogoutIcon />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;
