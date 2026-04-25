import type { JSX } from "react";
import "./PrimaryButtonStyle.css";

type PrimaryButton1Props = {
  type?: "submit" | "reset" | "button" | undefined;
  onclick?:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | (() => void);
  className?: string;
  children?: string | JSX.Element;
};

function PrimaryButton2({
  type = "button",
  onclick = () => {},
  className = "",
  children = "",
}: PrimaryButton1Props) {
  return (
    <button
      className={`primary-button-2 ${className}`}
      type={type}
      onClick={onclick}
    >
      {children}
    </button>
  );
}

export default PrimaryButton2;
