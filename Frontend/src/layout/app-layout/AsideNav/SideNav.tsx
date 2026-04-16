import { Link } from "react-router";

function SideNav() {
  return (
    <nav className="side-nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Profile</Link>
        </li>
        <li>
          <Link to="/">My messages</Link>
        </li>
        <li>
          <Link to="/">Start a community</Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideNav;
