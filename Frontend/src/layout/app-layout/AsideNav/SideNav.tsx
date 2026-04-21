import "./sideNavStyle.css";
import type React from "react";
import { useEffect } from "react";
import MainNav from "./NavComponents/MainNav";

function SideNav({
  sideNavRef,
}: {
  sideNavRef: React.RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1025px)");

    const handler = () => {
      const sideNavDiv = sideNavRef.current;
      if (sideNavDiv instanceof HTMLDivElement) {
        if (mediaQuery.matches) {
          sideNavDiv.ariaExpanded = "false";
        }
      }
    };

    handler();
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [sideNavRef]);

  const hideNav = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const sideNavDiv = sideNavRef.current;

    if (e.target instanceof HTMLElement) {
      if (
        sideNavDiv instanceof HTMLDivElement &&
        e.target.className === "side-nav-overlay"
      ) {
        sideNavDiv.ariaExpanded = "false";
      }
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1025px)");

    const handler = (e: MediaQueryListEvent) => {
      const sideNavDiv = sideNavRef.current;

      if (e.matches) {
        if (sideNavDiv instanceof HTMLDivElement) {
          sideNavDiv.ariaExpanded = "false";
          sideNavDiv.classList.remove("with-transition");
        }
      } else {
        if (sideNavDiv instanceof HTMLDivElement) {
          sideNavDiv.ariaExpanded = "true";
          sideNavDiv.classList.add("with-transition");
        }
      }
    };

    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [sideNavRef]);

  return (
    <div className="side-nav-overlay" onClick={hideNav}>
      <div
        id="side-nav"
        ref={sideNavRef}
        className="side-nav"
        aria-expanded="true"
      >
        <div className="side-nav-content">
          <MainNav sideNavRef={sideNavRef} />
        </div>

        <footer>
          <span>AJ Tan ⓒ 2026. All rights reserved.</span>
        </footer>
      </div>
    </div>
  );
}

export default SideNav;
