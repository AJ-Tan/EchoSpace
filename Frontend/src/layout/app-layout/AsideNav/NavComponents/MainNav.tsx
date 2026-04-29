import { NavLink } from "react-router";
import MenuIcon from "../../../../components/Icons/MenuIcon";
import HomeIcon from "../../../../components/Icons/HomeIcon";
import ProfileIcon from "../../../../components/Icons/ProfileIcon";
import MessageIcon from "../../../../components/Icons/MessageIcon";
import PlusIcon from "../../../../components/Icons/PlusIcon";
import { useAuth } from "../../../../hooks/useAuth";
import { useDisplay } from "../../../../hooks/useDisplay";
import useMessage from "../../../../hooks/useMessage";

function MainNav({
  sideNavRef,
}: {
  sideNavRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { authNavigation } = useAuth();
  const { setDisplayItem } = useDisplay();
  const { openWriteDialog } = useMessage();

  const authNav = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!authNavigation()) {
      e.preventDefault();
      setDisplayItem("Login to gain access.", false);
    }
  };

  const toggleMenu = () => {
    const sideNavDiv = sideNavRef.current;
    if (sideNavDiv instanceof HTMLDivElement) {
      sideNavDiv.ariaExpanded =
        sideNavDiv.ariaExpanded === "true" ? "false" : "true";
    }
  };

  return (
    <>
      <nav>
        <button
          className="btn-sidenav-menu"
          type="button"
          onClick={toggleMenu}
          aria-controls="side-nav"
        >
          <MenuIcon />
        </button>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <HomeIcon />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={authNav}
              to="/profile"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <ProfileIcon />
              <span>Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={authNav}
              to="/history"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <MessageIcon />
              <span>History</span>
            </NavLink>
          </li>
          <li>
            <button type="button" onClick={() => openWriteDialog()}>
              <PlusIcon />
              <span>Write Message</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default MainNav;
