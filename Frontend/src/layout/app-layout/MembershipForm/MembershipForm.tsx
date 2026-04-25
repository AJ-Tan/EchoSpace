import { useRef, useState } from "react";
import PrimaryButton1 from "../../../components/Buttons/PrimaryButton/PrimaryButton1";
import DialogForm from "../../../components/Dialog/DialogForm";
import FormInput from "../../../components/Inputs/FormInput/FormInput";
import PrimaryButton2 from "../../../components/Buttons/PrimaryButton/PrimaryButton2";
import { authSwitchMember } from "../../../services/auth";
import { useAuth } from "../../../hooks/useAuth";
import { useDisplay } from "../../../hooks/useDisplay";

function MembershipForm() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { user, setUser } = useAuth();
  const [passcode, setPasscode] = useState("");
  const [errorList, setErrorList] = useState<Record<string, string[]>>({});
  const { setDisplayItem } = useDisplay();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      const data = await authSwitchMember(user.id, passcode);
      if (!data.ok) {
        setErrorList(
          data.errors.reduce<Record<string, string[]>>((prev, err) => {
            if (!prev[err.path]) prev[err.path] = [];
            prev[err.path].push(err.msg);
            return prev;
          }, {}),
        );
      } else {
        setDisplayItem(data.message, true);
        setUser({ ...user, role: "member" });
      }
    }
  };

  const showDialog = () => {
    const dialogElement = dialogRef.current;
    if (dialogElement instanceof HTMLDialogElement) {
      dialogElement.showModal();
    }
  };

  const closeDialog = () => {
    const dialogElement = dialogRef.current;
    if (dialogElement instanceof HTMLDialogElement) {
      setPasscode("");
      setErrorList({});
      dialogElement.close();
    }
  };

  return (
    <div className="member-notification">
      <span>Become a member to unlock membership features.</span>
      <PrimaryButton1 onclick={showDialog}>Unlock</PrimaryButton1>
      <DialogForm ref={dialogRef} onsubmit={handleSubmit} close={closeDialog}>
        <h2>Membership Passcode</h2>
        <span>Hint: ajtan22</span>
        <FormInput
          id="membershipPasscode"
          labelText="Passcode"
          state={[passcode, setPasscode]}
          errorMessage={errorList["membershipPasscode"]}
          type="password"
        />
        <div className="form-controls">
          <PrimaryButton2 onclick={closeDialog}>Cancel</PrimaryButton2>
          <PrimaryButton1 type="submit">Enter</PrimaryButton1>
        </div>
      </DialogForm>
    </div>
  );
}

export default MembershipForm;
