import { format } from "date-fns";
import AvatarIcon from "../../../../components/Icons/AvatarIcon";
import "./messageListStyles.css";
import MessageMenu from "./MessageMenu";
import useMessage from "../../../../hooks/useMessage";
import { useAuth } from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import LoadingComponent from "../../../../components/Loading/LoadingComponent/LoadingComponent";
import PrimaryButton1 from "../../../../components/Buttons/PrimaryButton/PrimaryButton1";
import PrimaryLink1 from "../../../../components/Links/PrimaryLink/PrimaryLink1";

function MessageList() {
  const { msgLoading, messageList } = useMessage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const { openWriteDialog } = useMessage();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [setLoading]);

  if (msgLoading || loading) return <LoadingComponent />;
  if (messageList?.length === 0)
    return (
      <div className="no-message">
        <div className="no-message-content">
          <span>No message, be the first one.</span>
          {user ? (
            <PrimaryButton1
              onclick={() => {
                openWriteDialog();
              }}
            >
              Write
            </PrimaryButton1>
          ) : (
            <PrimaryLink1 to={"/auth/signin"}>Login</PrimaryLink1>
          )}
        </div>
      </div>
    );
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
