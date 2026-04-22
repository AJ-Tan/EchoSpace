import { useState } from "react";
import FormInput from "../../components/Inputs/FormInput/FormInput";
import { authSignIn } from "../../services/auth";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router";
import PageLogo from "../../components/PageLogo/PageLogo";
import PrimaryButton1 from "../../components/Buttons/PrimaryButton/PrimaryButton1";
import "./signInStyles.css";
import { useDisplay } from "../../hooks/useDisplay";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setDisplayItem } = useDisplay();
  const auth = useAuth();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await authSignIn({
      username,
      password,
    });
    if (!data.ok) {
      setDisplayItem(data.message, false);
    } else {
      auth.setUser(data.user);
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PageLogo />
      <header>
        <h1>Sign In</h1>
        <p>with your EchoSpace account.</p>
      </header>
      <div className="form-content">
        <FormInput
          id="username"
          labelText="Username"
          state={[username, setUsername]}
        />
        <FormInput
          id="password"
          labelText="Password"
          state={[password, setPassword]}
          type="password"
        />
        <div className="form-controls">
          <Link to="/auth/signup">Create account</Link>
          <PrimaryButton1 type="submit">Login</PrimaryButton1>
        </div>
      </div>
    </form>
  );
}

export default SignIn;
