import { Link } from "react-router";
import "./primaryLink.css";
function PrimaryLink1({ to, children }: { to: string; children: string }) {
  return (
    <Link className="primary-link-1" to={to}>
      {children}
    </Link>
  );
}

export default PrimaryLink1;
