import { useState } from "react";
import MenuIcon from "../../../components/Icons/MenuIcon";
import type React from "react";
import PrimaryLink1 from "../../../components/Links/PrimaryLink/PrimaryLink1";
import PrimaryLink2 from "../../../components/Links/PrimaryLink/PrimaryLink2";
import PageLogo from "../../../components/PageLogo/PageLogo";
import { useAuth } from "../../../hooks/useAuth";
import AvatarButton from "../../../components/Buttons/AvatarButton/AvatarButton";
import UserMenu from "./components/UserMenu";
import "./pageHeaderStyle.css";

function PageHeader({
  sideNavRef,
}: {
  sideNavRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { user } = useAuth();
  const [displayUserMenu, setDisplayUserMenu] = useState(false);

  const toggleNavMenu = () => {
    const sideNavDiv = sideNavRef.current;
    if (sideNavDiv instanceof HTMLDivElement) {
      sideNavDiv.ariaExpanded =
        sideNavDiv.ariaExpanded === "true" ? "false" : "true";
    }
  };

  const toggleUserMenu = () => {
    setDisplayUserMenu((prev) => !prev);
  };

  return (
    <header className="page-header">
      <div className="page-header-left">
        <button
          className="btn-header-menu"
          type="button"
          onClick={toggleNavMenu}
          aria-controls="side-nav"
        >
          <MenuIcon />
        </button>
        <PageLogo />
      </div>
      <div className="page-header-right">
        {user ? (
          <div className="avatar-container" onClick={toggleUserMenu}>
            <div className="user-details">
              <span>{user.name}</span>
              <span>@{user.username}</span>
            </div>
            <AvatarButton id={user.avatar_id} />
            {displayUserMenu && <UserMenu toggleUserMenu={toggleUserMenu} />}
          </div>
        ) : (
          <>
            <PrimaryLink2 className="sign-up" to="/auth/signup">
              Sign up
            </PrimaryLink2>
            <PrimaryLink1 to="/auth/signin">Login</PrimaryLink1>
          </>
        )}
      </div>
    </header>
  );
}

export default PageHeader;
