import { Link } from "react-router";
import "./primaryLink.css";
function PrimaryLink2({
  to,
  className = "",
  children,
}: {
  to: string;
  className?: string;
  children: string;
}) {
  return (
    <Link className={`primary-link-2 ${className}`} to={to}>
      {children}
    </Link>
  );
}

export default PrimaryLink2;
