import { Link } from "react-router";
import MenuIcon from "../../../../components/Icons/MenuIcon";
import HomeIcon from "../../../../components/Icons/HomeIcon";
import ProfileIcon from "../../../../components/Icons/ProfileIcon";
import MessageIcon from "../../../../components/Icons/MessageIcon";
import PlusIcon from "../../../../components/Icons/PlusIcon";

function MainNav({
  sideNavRef,
}: {
  sideNavRef: React.RefObject<HTMLDivElement | null>;
}) {
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
          <Link to="/">
            <ProfileIcon />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <MessageIcon />
            <span>My messages</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <PlusIcon />
            <span>Start a community</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
