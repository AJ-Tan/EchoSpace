import type { JSX } from "react";
import "./dialogFormStyles.css";

type DialogFormProps = {
  ref: React.RefObject<HTMLDialogElement | null>;
  onsubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  close: () => void;
  children: JSX.Element[];
};

function DialogForm({ ref, onsubmit, close, children }: DialogFormProps) {
  const closeDialog = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    const dialogRef = ref.current;
    const targetElement = e.target;
    if (dialogRef instanceof HTMLDialogElement && dialogRef === targetElement) {
      close();
    }
  };

  return (
    <dialog ref={ref} className="dialog-form" onMouseDown={closeDialog}>
      <form onSubmit={onsubmit}>{children}</form>
    </dialog>
  );
}

export default DialogForm;
