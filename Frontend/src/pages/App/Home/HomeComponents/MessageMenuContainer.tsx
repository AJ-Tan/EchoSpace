import { useEffect } from "react";
import type { MessageType } from "../../../../types/commonTypes";
import useMessage from "../../../../hooks/useMessage";
import { useDisplay } from "../../../../hooks/useDisplay";

function MessageMenuContainer({
  msgItem,
  close,
}: {
  msgItem: MessageType;
  close: () => void;
}) {
  const { openWriteDialog, deleteMessageItem } = useMessage();
  const { setDisplayItem } = useDisplay();

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

  const handleDelete = async () => {
    const data = await deleteMessageItem(msgItem.msg_id);

    if (!data.ok) {
      return setDisplayItem(data.message, false);
    }

    return setDisplayItem("Deleted selected message.", true);
  };

  return (
    <div className="pop-menu" aria-expanded="true">
      <button type="button" onClick={handleEdit}>
        Edit
      </button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default MessageMenuContainer;
