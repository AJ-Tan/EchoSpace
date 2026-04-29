import { useEffect } from "react";
import type { MessageType } from "../../../../types/commonTypes";
import useMessage from "../../../../hooks/useMessage";

function MessageMenuContainer({
  msgItem,
  close,
}: {
  msgItem: MessageType;
  close: () => void;
}) {
  const { openWriteDialog } = useMessage();

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.addEventListener("click", close);
    });

    return () => {
      window.removeEventListener("click", close);
      clearTimeout(timeout);
    };
  }, [close]);

  const handleEdit = () => {
    openWriteDialog(msgItem.title, msgItem.message, String(msgItem.msg_id));
  };

  return (
    <div className="pop-menu" aria-expanded="true">
      <button type="button" onClick={handleEdit}>
        Edit
      </button>
      <button type="button">Delete</button>
    </div>
  );
}

export default MessageMenuContainer;
