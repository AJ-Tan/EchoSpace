import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useMessage from "../../../hooks/useMessage";
import MessageList from "../Home/HomeComponents/MessageList";

function History() {
  const { user } = useAuth();
  const { loadMessage } = useMessage();

  useEffect(() => {
    if (user) {
      loadMessage(String(user.id));
    }
  }, [user, loadMessage]);
  return (
    <div>
      <MessageList />
    </div>
  );
}

export default History;
