import CloseIcon from "../../Icons/CloseIcon";
import "./closeButtonStyle.css";

type HandleClickType = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
) => void;

function CloseButton({ handleClick }: { handleClick: HandleClickType }) {
  return (
    <button className="btn-close" type="button" onClick={(e) => handleClick(e)}>
      <CloseIcon />
    </button>
  );
}

export default CloseButton;
