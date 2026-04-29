export type UserType = {
  id: number;
  username: string;
  name: string;
  avatar_id: string;
  role: string;
} | null;

export type DisplayItemType = {
  id: string;
  ok: boolean;
  message: string;
};

export type MessageType = {
  msg_id: number;
  user_id: number;
  title: string;
  message: string;
  is_archived: boolean;
  created_at: string;
  last_modified: null | string;
} & UserType;
