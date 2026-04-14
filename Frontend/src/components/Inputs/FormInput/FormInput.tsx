import "./formInput.css";

type FormInputProps = {
  id: string;
  labelText: string;
  state: [string, React.Dispatch<React.SetStateAction<string>>];
  errorMessage?: string[];
  type?: string;
};

function FormInput({
  id,
  labelText,
  type = "text",
  state,
  errorMessage = [],
}: FormInputProps) {
  const [inputValue, setInputValue] = state;

  return (
    <div className="form-input-container">
      <div
        className={`form-input ${inputValue.length ? "with-input" : ""} ${errorMessage?.length > 0 ? "warning" : ""}`}
      >
        <label htmlFor={id}>{labelText}</label>
        <input
          type={type}
          name={id}
          id={id}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </div>
      {errorMessage?.map((msg) => {
        return (
          <span key={msg} className="warning-message">
            <svg
              aria-hidden="true"
              fill="currentColor"
              focusable="false"
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
              xmlns="https://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
            </svg>
            {msg}
          </span>
        );
      })}
    </div>
  );
}

export default FormInput;
