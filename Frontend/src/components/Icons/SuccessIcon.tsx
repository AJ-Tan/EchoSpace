import CheckIconSVG from "../../assets/icons/check-icon.svg?react";
import "./iconStyles.css";

function SuccessIcon() {
  return (
    <div className={`icon-container ok`}>
      <CheckIconSVG />
    </div>
  );
}

export default SuccessIcon;
