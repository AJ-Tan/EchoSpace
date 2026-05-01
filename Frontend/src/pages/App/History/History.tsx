import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import useMessage from "../../../hooks/useMessage";
import MessageList from "../Home/HomeComponents/MessageList";
import "./historyStyles.css";

function History() {
  const { user } = useAuth();
  const { loadMessage } = useMessage();

  useEffect(() => {
    if (user) {
      loadMessage(String(user.id));
    }
  }, [user, loadMessage]);
  return (
    <div className="app-history">
      <MessageList />
    </div>
  );
}

export default History;
