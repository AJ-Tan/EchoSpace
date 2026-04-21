import { Link } from "react-router";
import MenuIcon from "../../../../components/Icons/MenuIcon";
import HomeIcon from "../../../../components/Icons/HomeIcon";
import ProfileIcon from "../../../../components/Icons/ProfileIcon";
import MessageIcon from "../../../../components/Icons/MessageIcon";
import PlusIcon from "../../../../components/Icons/PlusIcon";
import { useAuth } from "../../../../hooks/useAuth";
import { useDisplay } from "../../../../hooks/useDisplay";

function MainNav({
  sideNavRef,
}: {
  sideNavRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { authNavigation } = useAuth();
  const { setDisplayItem } = useDisplay();

  const authNav = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!authNavigation()) {
      e.preventDefault();
      setDisplayItem("Login to gain access.", false);
    }
  };

  const handleStartCommunity = () => {
    if (!authNavigation()) {
      return setDisplayItem("Login to gain access.", false);
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
        <li className="active">
          <Link to="/">
            <HomeIcon />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link onClick={authNav} to="/profile">
            <ProfileIcon />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link onClick={authNav} to="/message">
            <MessageIcon />
            <span>My messages</span>
          </Link>
        </li>
        <li>
          <button type="button" onClick={handleStartCommunity}>
            <PlusIcon />
            <span>Become a member</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
