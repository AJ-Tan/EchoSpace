import { useState } from "react";
import FormInput from "../../../components/Inputs/FormInput/FormInput";
import AvatarButton from "../../../components/Buttons/AvatarButton/AvatarButton";
import { useAuth } from "../../../hooks/useAuth";
import "./profileStyles.css";
import PrimaryButton1 from "../../../components/Buttons/PrimaryButton/PrimaryButton1";
import { updateProfile } from "../../../services/auth";
import { useDisplay } from "../../../hooks/useDisplay";

function Profile() {
  const { user, refreshProfile } = useAuth();
  const [firstName, setFirstName] = useState(user ? user?.first_name : "");
  const [lastName, setLastName] = useState(user ? user?.last_name : "");
  const [avatar, setAvatar] = useState(user ? user?.avatar_id : "1");
  const [errorList, setErrorList] = useState<Record<string, string[]>>({});
  const { setDisplayItem } = useDisplay();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user) {
      const data = await updateProfile(user.id, firstName, lastName, avatar);
      if (!data.ok) {
        console.log(data);
        return setErrorList(
          data.errors.reduce<Record<string, string[]>>((prev, err) => {
            if (!prev[err.path]) prev[err.path] = [];
            prev[err.path].push(err.msg);
            return prev;
          }, {}),
        );
      }
      refreshProfile();
      setDisplayItem(data.message);
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-form-group">
        <h2>Personal Information</h2>
        <div className="form-input-group">
          <FormInput
            id="firstName"
            labelText="First Name"
            state={[firstName, setFirstName]}
            errorMessage={errorList["firstName"]}
          />
          <FormInput
            id="lastName"
            labelText="Last Name"
            state={[lastName, setLastName]}
            errorMessage={errorList["lastName"]}
          />
        </div>
      </div>
      <div className="profile-form-group">
        <h2>Avatar</h2>
        <div className="avatar-group">
          <AvatarButton
            id="1"
            className={avatar === "1" ? "active" : ""}
            onclick={() => {
              setAvatar("1");
            }}
          />
          <AvatarButton
            id="2"
            className={avatar === "2" ? "active" : ""}
            onclick={() => {
              setAvatar("2");
            }}
          />
          <AvatarButton
            id="3"
            className={avatar === "3" ? "active" : ""}
            onclick={() => {
              setAvatar("3");
            }}
          />
          <AvatarButton
            id="4"
            className={avatar === "4" ? "active" : ""}
            onclick={() => {
              setAvatar("4");
            }}
          />
          <AvatarButton
            id="5"
            className={avatar === "5" ? "active" : ""}
            onclick={() => {
              setAvatar("5");
            }}
          />
          <AvatarButton
            id="6"
            className={avatar === "6" ? "active" : ""}
            onclick={() => {
              setAvatar("6");
            }}
          />
        </div>
      </div>
      <PrimaryButton1 type="submit">Save</PrimaryButton1>
    </form>
  );
}

export default Profile;
