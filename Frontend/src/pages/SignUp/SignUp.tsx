import { useRef, useState } from "react";
import FormInput from "../../components/FormInput/FormInput";
import { authSignUp } from "../../services/auth";
import "./signUp.css";
import { validateUserInformation } from "../../services/input-validation";
import { useNavigate } from "react-router";
import PrimaryButton1 from "../../components/Buttons/PrimaryButton/PrimaryButton1";

type ValidateItem = {
  params: string;
  body: Record<string, string>;
  title: string;
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
  const groupRef = useRef<Record<number, HTMLDivElement | null>>({});

  const validateInputs: ValidateInputs = {
    1: {
      params: "/signup/validate/user-information",
      body: { firstName, lastName },
      title: "Personal Information",
      description: "Let us know who you are.",
    },
    2: {
      params: "/signup/validate/login-credentials",
      body: { username, password, confirmPassword },
      title: "Login Credentials",
      description: "Set up your credentials for this account.",
    },
    3: {
      params: "/signup/validate/admin",
      body: { admin },
      title: "Admin Account",
      description:
        "Enter the correct keyword to set user as admin, leave empty if not.",
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
      const nextIndex = active + 1;
      const currentGroup = groupRef.current[active];
      const nextGroup = groupRef.current[nextIndex];

      currentGroup?.classList.add("slide-out-toLeft-abs");
      nextGroup?.classList.add("slide-in-fromRight", "active");
      nextGroup?.addEventListener(
        "animationend",
        () => {
          setActive((prev) => prev + 1);
        },
        { once: true },
      );
    }
  };
  const previousGroup = () => {
    const previousIndex = active - 1;
    const currentGroup = groupRef.current[active];
    const previousGroup = groupRef.current[previousIndex];

    currentGroup?.classList.add("slide-out-toRight-abs");
    previousGroup?.classList.add("slide-in-fromLeft", "active");
    previousGroup?.addEventListener(
      "animationend",
      () => {
        setActive((prev) => prev - 1);
      },
      { once: true },
    );
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
        <h1>{validateInputs[active].title}</h1>
        <p>{validateInputs[active].description}</p>
      </header>
      <div
        ref={(el) => {
          groupRef.current["1"] = el;
        }}
        className={`form-group ${active === 1 && "active"}`}
      >
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
      </div>
      <div
        ref={(el) => {
          groupRef.current["2"] = el;
        }}
        className={`form-group ${active === 2 && "active"}`}
      >
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
      </div>
      <div
        ref={(el) => {
          groupRef.current["3"] = el;
        }}
        className={`form-group ${active === 3 && "active"}`}
      >
        <FormInput
          id="isAdmin"
          labelText="Admin Keyword (optional)"
          state={[admin, setAdmin]}
          errorMessage={errorList["admin"]}
          type="password"
        />
      </div>
      {active !== 1 && (
        <PrimaryButton1 onclick={previousGroup}>Back</PrimaryButton1>
      )}
      {Object.keys(validateInputs).length !== active ? (
        <PrimaryButton1 onclick={nextGroup}>Next</PrimaryButton1>
      ) : (
        <PrimaryButton1 type="submit">Register</PrimaryButton1>
      )}
    </form>
  );
}

export default SignUp;
