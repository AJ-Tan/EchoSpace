import { Outlet } from "react-router";
import "./appLayoutStyle.css";
import PageHeader from "./PageHeader/PageHeader";
import SideNav from "./AsideNav/SideNav";
import { useRef } from "react";
import MembershipForm from "./MembershipForm/MembershipForm";
import { useAuth } from "../../hooks/useAuth";

function AppLayout() {
  const sideNavRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const showMembership = user?.role === "user" ? true : false;

  return (
    <div className="app">
      <PageHeader sideNavRef={sideNavRef} />
      <main>
        <SideNav sideNavRef={sideNavRef} />
        <div className="main-content">
          {showMembership && <MembershipForm />}
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
