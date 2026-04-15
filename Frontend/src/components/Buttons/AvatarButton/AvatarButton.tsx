import { avatar } from "../../../utils/avatarImg";
import "./avatarButtonStyles.css";

type AvatarButtonType = {
  id: string;
  className?: string;
  onclick?: () => void;
};

function AvatarButton({ id, className, onclick }: AvatarButtonType) {
  return (
    <button
      className={`btn-avatar ${className}`}
      type="button"
      onClick={onclick}
    >
      <img src={avatar[id]} alt="" draggable="false" />
    </button>
  );
}

export default AvatarButton;
