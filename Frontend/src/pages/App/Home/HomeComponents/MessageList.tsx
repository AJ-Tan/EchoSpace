import { format } from "date-fns";
import AvatarIcon from "../../../../components/Icons/AvatarIcon";
import "./messageListStyles.css";
import MessageMenu from "./MessageMenu";
import useMessage from "../../../../hooks/useMessage";
import { useAuth } from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";

function MessageList() {
  const { msgLoading, messageList } = useMessage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [setLoading]);

  if (msgLoading || loading) return <>Loading</>;
  if (messageList?.length === 0) return <>No message</>;
  return (
    <ul className="message-list">
      {messageList.map((item) => (
        <li key={item.msg_id}>
          <div className="message-eyebrow">
            <div className="message-details">
              <AvatarIcon id={item.avatar_id} />
              {user?.role === "admin" ||
              user?.role === "member" ||
              user?.id === item.user_id ? (
                <>
                  <span>@{item.username}</span>
                  <span> • </span>
                  <span>
                    {format(new Date(item.created_at), "MMM dd, yyyy HH:mm")}
                  </span>
                  {item.last_modified && (
                    <span>
                      - Last Modified: (
                      {format(
                        new Date(item.last_modified),
                        "MMM dd, yyyy HH:mm",
                      )}
                      )
                    </span>
                  )}
                </>
              ) : (
                <span className="details-hidden">
                  hidden - Become a member to reveal.
                </span>
              )}
            </div>

            {user?.role === "admin" || user?.id === item.user_id ? (
              <MessageMenu msgItem={item} />
            ) : (
              <></>
            )}
          </div>
          <h2>{item.title}</h2>
          <span>{item.message}</span>
        </li>
      ))}
    </ul>
  );
}

export default MessageList;
