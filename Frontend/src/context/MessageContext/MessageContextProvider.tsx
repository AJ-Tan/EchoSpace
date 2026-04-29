import { useEffect, useState, type JSX } from "react";
import { getMessage } from "../../services/message";
import { MessageContext } from "./MessageContext";
import WriteMessage from "./components/WriteMessage";

function MessageContextProvider({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  const [userId, setUserId] = useState("");
  const [messageList, setMessageList] = useState(null);
  const [msgLoading, setMsgLoading] = useState(true);

  useEffect(() => {
    getMessage().then((data) => {
      setMessageList(data.rows);
      setMsgLoading(false);
    });
  }, []);

  const loadMessage = (user_id = "") => {
    setUserId(String(user_id));
    refreshList();
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
      }}
    >
      {children}
      {WriteDialogElement}
    </MessageContext>
  );
}

export default MessageContextProvider;
