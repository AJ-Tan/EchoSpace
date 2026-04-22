import type { JSX } from "react";
import "./PrimaryButton1Style.css";

type PrimaryButton1Props = {
  type?: "submit" | "reset" | "button" | undefined;
  onclick?:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | (() => void);
  className?: string;
  children?: string | JSX.Element;
};

function PrimaryButton1({
  type = "button",
  onclick = () => {},
  className = "",
  children = "",
}: PrimaryButton1Props) {
  return (
    <button
      className={`primary-button-1 ${className}`}
      type={type}
      onClick={onclick}
    >
      {children}
    </button>
  );
}

export default PrimaryButton1;
