import { avatar } from "../../utils/avatarImg";

function AvatarIcon({ id }: { id: string }) {
  return (
    <div className="icon-avatar">
      <img src={avatar[id]} alt="" />
    </div>
  );
}

export default AvatarIcon;
