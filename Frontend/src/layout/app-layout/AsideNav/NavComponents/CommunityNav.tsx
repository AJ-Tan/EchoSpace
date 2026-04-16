import { Link } from "react-router";
import CaretDownIcon from "../../../../components/Icons/CaretIcon";
import { useRef } from "react";

function CommunityNav() {
  const navContentRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    const navContent = navContentRef.current;

    if (navContent instanceof HTMLElement) {
      navContent.ariaExpanded =
        navContent.ariaExpanded === "true" ? "false" : "true";
    }
  };

  return (
    <nav className="nav-community">
      <button
        type="button"
        className="btn-nav-header"
        onClick={toggleExpand}
        aria-controls="nav-community-content"
      >
        COMMUNITIES
        <CaretDownIcon />
      </button>

      <div
        id="nav-community-content"
        ref={navContentRef}
        className="nav-content"
        aria-expanded="false"
      >
        <ul>
          <li className="">
            <Link to="/">Another Eden</Link>
          </li>
          <li className="">
            <Link to="/">Another Eden</Link>
          </li>
          <li className="">
            <Link to="/">Another Eden</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default CommunityNav;
