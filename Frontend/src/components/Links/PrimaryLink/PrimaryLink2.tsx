import { Link } from "react-router";
import "./primaryLink.css";
function PrimaryLink2({ to, children }: { to: string; children: string }) {
  return (
    <Link className="primary-link-2" to={to}>
      {children}
    </Link>
  );
}

export default PrimaryLink2;
