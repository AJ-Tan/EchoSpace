import MessageIconSVG from "../../assets/icons/message-icon.svg?react";
import "./iconStyles.css";

function MessageIcon() {
  return (
    <div className={`icon-container message`}>
      <MessageIconSVG />
    </div>
  );
}

export default MessageIcon;
