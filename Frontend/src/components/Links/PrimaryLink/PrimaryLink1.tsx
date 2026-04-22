import { Link } from "react-router";
import "./primaryLink.css";
import type { JSX } from "react";
function PrimaryLink1({
  to,
  className = "",
  children,
}: {
  to: string;
  className?: string;
  children: string | JSX.Element;
}) {
  return (
    <Link className={`primary-link-1 ${className}`} to={to}>
      {children}
    </Link>
  );
}

export default PrimaryLink1;
