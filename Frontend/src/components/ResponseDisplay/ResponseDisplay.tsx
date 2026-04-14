import { useState } from "react";
import "./responseDisplay.css";
import SuccessIcon from "../Icons/SuccessIcon";
import WarningIcon from "../Icons/WarningIcon";
import CloseButton from "../Buttons/CloseButton/CloseButton";
import type { DisplayItemType } from "../../types/commonTypes";

function ResponseDisplay() {
  const [displayList, setDisplayList] = useState<DisplayItemType[]>([]);

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

  return {
    setDisplayList,
    element: (
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
    ),
  };
}

export default ResponseDisplay;
