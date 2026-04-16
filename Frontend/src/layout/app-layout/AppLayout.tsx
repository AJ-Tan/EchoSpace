import { Outlet } from "react-router";
import "./appLayoutStyle.css";
import PageHeader from "./PageHeader/PageHeader";
import SideNav from "./AsideNav/SideNav";
import { useRef } from "react";

function AppLayout() {
  const sideNavRef = useRef<HTMLDivElement>(null);

  return (
    <div className="app">
      <PageHeader sideNavRef={sideNavRef} />
      <main>
        <SideNav sideNavRef={sideNavRef} />
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
