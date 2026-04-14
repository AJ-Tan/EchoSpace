import "./formCheckbox.css";

type FormCheckboxType = {
  id: string;
  labelText: string;
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  type?: string;
};

function FormCheckbox({ id, labelText, state }: FormCheckboxType) {
  const [isChecked, setIsChecked] = state;
  return (
    <label className="form-checkbox">
      <input
        type="checkbox"
        name={id}
        onChange={(e) => setIsChecked(e.target.checked)}
        checked={isChecked}
      />{" "}
      <span>{labelText}</span>
    </label>
  );
}

export default FormCheckbox;
