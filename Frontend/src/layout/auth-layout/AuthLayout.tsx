import { Outlet } from "react-router";
import "./authLayoutStyles.css";

function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout-wrapper">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
