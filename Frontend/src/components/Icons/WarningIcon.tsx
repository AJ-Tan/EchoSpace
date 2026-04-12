import ExclamationIconSVG from "../../assets/exclamation-icon.svg?react";
import "./iconStyles.css";

function WarningIcon() {
  return (
    <div className={`icon-container warning`}>
      <ExclamationIconSVG />
    </div>
  );
}

export default WarningIcon;
