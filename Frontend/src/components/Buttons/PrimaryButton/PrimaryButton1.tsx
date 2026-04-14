import "./PrimaryButton1Style.css";

type PrimaryButton1Props = {
  type?: "submit" | "reset" | "button" | undefined;
  onclick?:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | (() => void);
  children?: string;
};

function PrimaryButton1({
  type = "button",
  onclick = () => {},
  children = "",
}: PrimaryButton1Props) {
  return (
    <button className="primary-button-1" type={type} onClick={onclick}>
      {children}
    </button>
  );
}

export default PrimaryButton1;
