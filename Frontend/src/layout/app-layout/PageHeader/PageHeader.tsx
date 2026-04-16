import { useState } from "react";
import SearchInput from "../../../components/Inputs/SearchInput/SearchInput";
import PrimaryButton1 from "../../../components/Buttons/PrimaryButton/PrimaryButton1";
import "./pageHeaderStyle.css";
import MenuIcon from "../../../components/Icons/MenuIcon";
import type React from "react";

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
      <PrimaryButton1>Login</PrimaryButton1>
    </header>
  );
}

export default PageHeader;
