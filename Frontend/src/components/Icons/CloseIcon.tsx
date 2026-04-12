import CloseIconSVG from "../../assets/close-icon.svg?react";
import "./iconStyles.css";

function CloseIcon() {
  return (
    <div className={`icon-container close`}>
      <CloseIconSVG />
    </div>
  );
}

export default CloseIcon;
