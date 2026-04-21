import { useState } from "react";
import SearchInput from "../../../components/Inputs/SearchInput/SearchInput";
import "./pageHeaderStyle.css";
import MenuIcon from "../../../components/Icons/MenuIcon";
import type React from "react";
import PrimaryLink1 from "../../../components/Links/PrimaryLink/PrimaryLink1";
import PrimaryLink2 from "../../../components/Links/PrimaryLink/PrimaryLink2";

function PageHeader({
  sideNavRef,
}: {
  sideNavRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [searchInput, setSearchInput] = useState("");

  const toggleMenu = () => {
    const sideNavDiv = sideNavRef.current;
    if (sideNavDiv instanceof HTMLDivElement) {
      sideNavDiv.ariaExpanded =
        sideNavDiv.ariaExpanded === "true" ? "false" : "true";
    }
  };

  return (
    <header className="page-header">
      <div className="page-logo">
        <button
          className="btn-header-menu"
          type="button"
          onClick={toggleMenu}
          aria-controls="side-nav"
        >
          <MenuIcon />
        </button>
        <span>EchoSpace</span>
      </div>
      <SearchInput
        state={[searchInput, setSearchInput]}
        placeholder={"Find Anything"}
      />
      <div className="page-header-controls">
        <PrimaryLink2 to="/signup">Sign up</PrimaryLink2>
        <PrimaryLink1 to="/signin">Login</PrimaryLink1>
      </div>
    </header>
  );
}

export default PageHeader;
