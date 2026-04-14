import { useState } from "react";
import "./responseDisplay.css";
import SuccessIcon from "../Icons/SuccessIcon";
import WarningIcon from "../Icons/WarningIcon";
import CloseButton from "../Buttons/CloseButton/CloseButton";

type DisplayItemType = {
  id: string;
  ok: boolean;
  message: string;
};

function ResponseDisplay() {
  const [displayList, setDisplayList] = useState<DisplayItemType[]>([
    { id: "a", ok: true, message: "User has successfully registered." },
    { id: "b", ok: false, message: "Invalid credential." },
  ]);

  const handleClose = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const parent = (e.currentTarget as HTMLElement).parentElement;
    if (parent instanceof HTMLElement) {
      parent.classList.add("slide-out-toRight");

      parent.addEventListener(
        "animationend",
        () => {
          setDisplayList((prev) => prev.filter((item) => item.id !== id));
        },
        { once: true },
      );
    }
  };

  const handleAnimationEnd = (
    id: string,
    e: React.AnimationEvent<HTMLDivElement>,
  ) => {
    if (e.target instanceof HTMLElement) {
      const parent = e.target.parentElement;
      if (parent instanceof HTMLElement) {
        requestAnimationFrame(() => {
          parent.classList.add("slide-out-toRight");

          parent.addEventListener(
            "animationend",
            () => {
              setDisplayList((prev) => prev.filter((item) => item.id !== id));
            },
            { once: true },
          );
        });
      }
    }
  };

  return (
    <ul className="response-list">
      {displayList.map((item) => (
        <li
          key={item.id}
          id={item.id}
          className="response-item slide-in-fromRight"
          onAnimationEnd={(e) => {
            (e.target as HTMLElement).classList.remove("slide-in-fromRight");
          }}
        >
          <CloseButton handleClick={(e) => handleClose(item.id, e)} />
          <div className="response-content">
            {item.ok ? <SuccessIcon /> : <WarningIcon />}
            <span>{item.message}</span>
          </div>
          <div
            className={`response-countdown ${item.ok ? "ok" : "warning"}`}
            onAnimationEndCapture={(e) => handleAnimationEnd(item.id, e)}
          ></div>
        </li>
      ))}
    </ul>
  );
}

export default ResponseDisplay;
