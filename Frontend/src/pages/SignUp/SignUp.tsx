import { useRef, useState } from "react";
import FormInput from "../../components/Inputs/FormInput/FormInput";
import { authSignUp } from "../../services/auth";
import { validateUserInformation } from "../../services/input-validation";
import { useNavigate } from "react-router";
import PrimaryButton1 from "../../components/Buttons/PrimaryButton/PrimaryButton1";
import AvatarButton from "../../components/Buttons/AvatarButton/AvatarButton";
import PageLogo from "../../components/PageLogo/PageLogo";
import LoadingForm from "../../components/Loading/LoadingForm/LoadingForm";
import "./signUpStyles.css";
import { useDisplay } from "../../hooks/useDisplay";
import PrimaryButton2 from "../../components/Buttons/PrimaryButton/PrimaryButton2";

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
  const [avatar, setAvatar] = useState("1");
  const [admin, setAdmin] = useState("");
  const [errorList, setErrorList] = useState<Record<string, string[]>>({});
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const groupRef = useRef<Record<number, HTMLDivElement | null>>({});
  const { setDisplayItem } = useDisplay();
  const [loading, setLoading] = useState(false);

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
      params: "/signup/validate/avatar",
      body: { avatar },
      title: "Avatar",
      description: "Select an avatar for your account.",
    },
    4: {
      params: "/signup/validate/admin",
      body: { admin },
      title: "Admin Account",
      description:
        "Enter the correct keyword to set user as admin, leave empty if not. Hint: ajtan123",
    },
  };

  const nextGroup = async () => {
    setLoading(true);
    const data = await validateUserInformation(validateInputs[active]);
    if (!data.ok) {
      setErrorList(
        data.errors.reduce<Record<string, string[]>>((prev, err) => {
          if (!prev[err.path]) prev[err.path] = [];
          prev[err.path].push(err.msg);
          return prev;
        }, {}),
      );
      setLoading(false);
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
      setLoading(false);
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
      avatar,
      admin,
    });
    if (!data.ok) {
      console.log(data);
      setErrorList(
        data.errors.reduce<Record<string, string[]>>((prev, err) => {
          if (!prev[err.path]) prev[err.path] = [];
          prev[err.path].push(err.msg);
          return prev;
        }, {}),
      );
    } else {
      setDisplayItem(
        "Register success, you can login with your account.",
        true,
      );
      navigate("/auth/signin", { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {loading && <LoadingForm />}

      <PageLogo />
      <header>
        <h1>{validateInputs[active].title}</h1>
        <p>{validateInputs[active].description}</p>
      </header>

      <div className="form-content">
        {/* Group 1 ===================================================== */}

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

        {/* Group 2 ===================================================== */}

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

        {/* Group 3 ===================================================== */}

        <div
          ref={(el) => {
            groupRef.current["3"] = el;
          }}
          className={`form-group ${active === 3 && "active"}`}
        >
          {errorList["avatar"] && (
            <span style={{ color: "var(--warning)" }}>
              {errorList["avatar"][0]}
            </span>
          )}
          <div className="group-avatar">
            <AvatarButton
              id="1"
              className={avatar === "1" ? "active" : ""}
              onclick={() => {
                setAvatar("1");
              }}
            />
            <AvatarButton
              id="2"
              className={avatar === "2" ? "active" : ""}
              onclick={() => {
                setAvatar("2");
              }}
            />
            <AvatarButton
              id="3"
              className={avatar === "3" ? "active" : ""}
              onclick={() => {
                setAvatar("3");
              }}
            />
            <AvatarButton
              id="4"
              className={avatar === "4" ? "active" : ""}
              onclick={() => {
                setAvatar("4");
              }}
            />
            <AvatarButton
              id="5"
              className={avatar === "5" ? "active" : ""}
              onclick={() => {
                setAvatar("5");
              }}
            />
            <AvatarButton
              id="6"
              className={avatar === "6" ? "active" : ""}
              onclick={() => {
                setAvatar("6");
              }}
            />
          </div>
        </div>

        {/* Group 4 ===================================================== */}

        <div
          ref={(el) => {
            groupRef.current["4"] = el;
          }}
          className={`form-group ${active === 4 && "active"}`}
        >
          <FormInput
            id="isAdmin"
            labelText="Admin Keyword (optional)"
            state={[admin, setAdmin]}
            errorMessage={errorList["admin"]}
            type="password"
          />
        </div>
        <div className="form-controls">
          {active !== 1 && (
            <PrimaryButton2 onclick={previousGroup}>Back</PrimaryButton2>
          )}
          {Object.keys(validateInputs).length !== active ? (
            <PrimaryButton1 onclick={nextGroup}>Next</PrimaryButton1>
          ) : (
            <PrimaryButton1 type="submit">Register</PrimaryButton1>
          )}
        </div>
      </div>
    </form>
  );
}

export default SignUp;
