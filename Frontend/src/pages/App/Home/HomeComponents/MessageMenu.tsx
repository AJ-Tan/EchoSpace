import { useState } from "react";
import ThreedotsIcon from "../../../../components/Icons/ThreedotsIcon";
import MessageMenuContainer from "./MessageMenuContainer";
import type { MessageType } from "../../../../types/commonTypes";

function MessageMenu({ msgItem }: { msgItem: MessageType }) {
  const [displayMenu, setDisplayMenu] = useState(false);

  const openMenu = () => {
    setDisplayMenu(true);
  };

  const closeMenu = () => {
    setDisplayMenu(false);
  };

  return (
    <div className="message-menu">
      <button className="btn-message-menu" type="button" onClick={openMenu}>
        <ThreedotsIcon />
      </button>
      {displayMenu && (
        <MessageMenuContainer msgItem={msgItem} close={closeMenu} />
      )}
    </div>
  );
}

export default MessageMenu;
