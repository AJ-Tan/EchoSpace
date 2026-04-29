import { useEffect, useState, type JSX } from "react";
import { deleteMessage, getMessage } from "../../services/message";
import { MessageContext } from "./MessageContext";
import WriteMessage from "./components/WriteMessage";

function MessageContextProvider({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  const [userId, setUserId] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [msgLoading, setMsgLoading] = useState(true);

  useEffect(() => {
    setMsgLoading(true);
    getMessage({ user_id: userId }).then((data) => {
      setMessageList(data.rows);
      setMsgLoading(false);
    });
  }, [userId]);

  const loadMessage = (user_id = "") => {
    setUserId(String(user_id));
  };

  const refreshList = async () => {
    setMsgLoading(true);
    const data = await getMessage({ user_id: userId });
    setMessageList(data.rows);
    setMsgLoading(false);
  };

  const getMessageItem = async (id: number) => {
    const data = await getMessage({ id: String(id) });
    return data.item;
  };

  const deleteMessageItem = async (id: number) => {
    const data = await deleteMessage(id);
    refreshList();
    return data;
  };

  const { openWriteDialog, WriteDialogElement } = WriteMessage(refreshList);
  return (
    <MessageContext
      value={{
        messageList,
        msgLoading,
        loadMessage,
        refreshList,
        getMessageItem,
        openWriteDialog,
        deleteMessageItem,
      }}
    >
      {children}
      {WriteDialogElement}
    </MessageContext>
  );
}

export default MessageContextProvider;
