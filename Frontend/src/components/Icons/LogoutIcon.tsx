import LogoutIconSVG from "../../assets/icons/logout-icon.svg?react";
import "./iconStyles.css";

function LogoutIcon() {
  return (
    <div className={`icon-container logout`}>
      <LogoutIconSVG />
    </div>
  );
}

export default LogoutIcon;
