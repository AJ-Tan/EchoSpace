import { useState } from "react";
import FormInput from "../../components/FormInput/FormInput";
import { authSignUp } from "../../services/auth";
import "./signUp.css";
import { validateUserInformation } from "../../services/input-validation";
import { useNavigate } from "react-router";

type ValidateItem = {
  params: string;
  body: Record<string, string>;
  description: string;
};

type ValidateInputs = Record<number, ValidateItem>;

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [admin, setAdmin] = useState("");
  const [errorList, setErrorList] = useState<Record<string, string[]>>({});
  const [active, setActive] = useState(1);
  const navigate = useNavigate();

  const validateInputs: ValidateInputs = {
    1: {
      params: "/signup/validate/user-information",
      body: { firstName, lastName },
      description: "Insert personal information",
    },
    2: {
      params: "/signup/validate/login-credentials",
      body: { username, password, confirmPassword },
      description: "Set up your login credentials.",
    },
    3: {
      params: "/signup/validate/admin",
      body: { admin },
      description: "Enter the correct keyword to set user as admin.",
    },
  };

  const nextGroup = async () => {
    const data = await validateUserInformation(validateInputs[active]);

    if (!data.ok) {
      setErrorList(
        data.errors.reduce<Record<string, string[]>>((prev, err) => {
          if (!prev[err.path]) prev[err.path] = [];
          prev[err.path].push(err.msg);
          return prev;
        }, {}),
      );
    } else {
      setErrorList({});
      setActive((prev) => prev + 1);
    }
  };
  const previousGroup = () => {
    setActive((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await authSignUp({
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      admin,
    });
    if (!data.ok) {
      setErrorList(
        data.errors.reduce<Record<string, string[]>>((prev, err) => {
          if (!prev[err.path]) prev[err.path] = [];
          prev[err.path].push(err.msg);
          return prev;
        }, {}),
      );
    } else {
      navigate("/signin", { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <header>
        <h1>Sign Up</h1>
        <p>{validateInputs[active].description}</p>
      </header>
      <div className={`form-group ${active === 1 && "active"}`}>
        <FormInput
          id="firstName"
          labelText="First Name"
          state={[firstName, setFirstName]}
          errorMessage={errorList["firstName"]}
        />
        <FormInput
          id="lastName"
          labelText="Last Name"
          state={[lastName, setLastName]}
          errorMessage={errorList["lastName"]}
        />
        <button type="button" onClick={nextGroup}>
          Next
        </button>
      </div>
      <div className={`form-group ${active === 2 && "active"}`}>
        <FormInput
          id="username"
          labelText="Username"
          state={[username, setUsername]}
          errorMessage={errorList["username"]}
        />
        <FormInput
          id="password"
          labelText="Password"
          state={[password, setPassword]}
          errorMessage={errorList["password"]}
          type="password"
        />
        <FormInput
          id="confirmPassword"
          labelText="Confirm Password"
          state={[confirmPassword, setConfirmPassword]}
          errorMessage={errorList["confirmPassword"]}
          type="password"
        />
        <button type="button" onClick={previousGroup}>
          Back
        </button>
        <button type="button" onClick={nextGroup}>
          Next
        </button>
      </div>
      <div className={`form-group ${active === 3 && "active"}`}>
        <FormInput
          id="isAdmin"
          labelText="Admin Keyword (optional)"
          state={[admin, setAdmin]}
          errorMessage={errorList["admin"]}
          type="password"
        />
        <button type="button" onClick={previousGroup}>
          Back
        </button>
        <button type="submit">Register</button>
      </div>
    </form>
  );
}

export default SignUp;
