import { Outlet } from "react-router";
import "./appLayoutStyle.css";
import PageHeader from "./PageHeader/PageHeader";
import SideNav from "./AsideNav/SideNav";

function AppLayout() {
  return (
    <div className="app">
      <PageHeader />
      <main>
        <SideNav />
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
