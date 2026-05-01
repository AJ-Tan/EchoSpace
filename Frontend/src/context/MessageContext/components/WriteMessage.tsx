import { useRef, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useDisplay } from "../../../hooks/useDisplay";
import { writeMessage } from "../../../services/message";
import DialogForm from "../../../components/Dialog/DialogForm";
import FormInput from "../../../components/Inputs/FormInput/FormInput";
import FormTextArea from "../../../components/Inputs/FormTextArea/FormTextArea";
import PrimaryButton2 from "../../../components/Buttons/PrimaryButton/PrimaryButton2";
import PrimaryButton1 from "../../../components/Buttons/PrimaryButton/PrimaryButton1";
import LoadingForm from "../../../components/Loading/LoadingForm/LoadingForm";

function WriteMessage(refreshList: (user_id?: string) => void) {
  const [msgId, setMsgId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [errorList, setErrorList] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { user } = useAuth();
  const { setDisplayItem } = useDisplay();

  const openWriteDialog = (titleValue = "", messageValue = "", id = "") => {
    if (!user) return setDisplayItem("Login to gain access.", false);
    const dialogElement = dialogRef.current;
    setMsgId(id);
    setTitle(titleValue);
    setMessage(messageValue);

    if (dialogElement instanceof HTMLDialogElement) {
      dialogElement?.showModal();
    }
  };

  const closeWriteDialog = () => {
    const dialogElement = dialogRef.current;
    if (dialogElement instanceof HTMLDialogElement) {
      dialogElement?.close();
      setErrorList({});
      setTitle("");
      setMessage("");
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!user) return;
    const data = await writeMessage(user.id, title, message, msgId);
    setLoading(false);
    if (!data.ok) {
      return setErrorList(
        data.errors.reduce<Record<string, string[]>>((prev, err) => {
          if (!prev[err.path]) prev[err.path] = [];
          prev[err.path].push(err.msg);
          return prev;
        }, {}),
      );
    }
    setDisplayItem(data.message, data.ok);
    refreshList();
    closeWriteDialog();
  };

  return {
    openWriteDialog,
    WriteDialogElement: (
      <DialogForm
        ref={dialogRef}
        close={closeWriteDialog}
        onsubmit={handleSubmit}
      >
        {loading ? <LoadingForm /> : <></>}
        <h2>Post Message</h2>
        <FormInput
          id="title"
          labelText="Title"
          state={[title, setTitle]}
          errorMessage={errorList["title"]}
        />

        <FormTextArea
          id="message"
          placeholder="Message"
          state={[message, setMessage]}
          errorMessage={errorList["message"]}
        />
        <div className="form-controls">
          <PrimaryButton2 onclick={closeWriteDialog}>Close</PrimaryButton2>
          <PrimaryButton1 type="submit">Post</PrimaryButton1>
        </div>
      </DialogForm>
    ),
  };
}

export default WriteMessage;
