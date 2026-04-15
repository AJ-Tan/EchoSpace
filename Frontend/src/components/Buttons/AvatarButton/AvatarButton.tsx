import { avatar } from "../../../utils/avatarImg";
import "./avatarButtonStyles.css";

type AvatarButtonType = { id: string; onclick?: () => void };

function AvatarButton({ id, onclick }: AvatarButtonType) {
  return (
    <button className="btn-avatar" type="button" onClick={onclick}>
      <img src={avatar[id]} alt="" />
    </button>
  );
}

export default AvatarButton;
