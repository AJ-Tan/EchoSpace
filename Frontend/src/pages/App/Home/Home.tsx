import { useEffect } from "react";
import useMessage from "../../../hooks/useMessage";
import MessageList from "./HomeComponents/MessageList";
import "./homeStyles.css";

function Home() {
  const { loadMessage } = useMessage();

  useEffect(() => {
    loadMessage();
  }, [loadMessage]);

  return (
    <div className="app-home">
      <MessageList />
    </div>
  );
}

export default Home;
