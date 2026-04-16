import { Outlet } from "react-router";
import PageNav from "./PageNav/PageNav";

function AppLayout() {
  return (
    <div className="app">
      <PageNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
