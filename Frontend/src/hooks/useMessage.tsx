import { useContext } from "react";
import { MessageContext } from "../context/MessageContext/MessageContext";

function useMessage() {
  const context = useContext(MessageContext);

  if (!context) throw new Error("Message context is not used within provider");
  return context;
}

export default useMessage;
