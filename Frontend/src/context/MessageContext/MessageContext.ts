import { createContext } from "react";
import type { MessageType } from "../../types/commonTypes";

type MessageContextType = {
  messageList: MessageType[];
  msgLoading: boolean;
  loadMessage: (user_id?: string) => void;
  refreshList: () => void;
  getMessageItem: (id: number) => Promise<{ ok: boolean; item: MessageType }>;
  openWriteDialog: (
    titleValue?: string,
    messageValue?: string,
    id?: string,
  ) => void;
  deleteMessageItem: (id: number) => Promise<{ ok: boolean; message: string }>;
};

export const MessageContext = createContext<MessageContextType | null>(null);
