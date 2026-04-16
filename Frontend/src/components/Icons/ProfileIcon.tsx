import ProfileIconSVG from "../../assets/icons/profile-icon.svg?react";
import "./iconStyles.css";

function ProfileIcon() {
  return (
    <div className={`icon-container profile`}>
      <ProfileIconSVG />
    </div>
  );
}

export default ProfileIcon;
