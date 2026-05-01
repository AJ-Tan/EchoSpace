import { useState } from "react";
import FormInput from "../../components/Inputs/FormInput/FormInput";
import { authSignIn } from "../../services/auth";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router";
import PageLogo from "../../components/PageLogo/PageLogo";
import PrimaryButton1 from "../../components/Buttons/PrimaryButton/PrimaryButton1";
import "./signInStyles.css";
import { useDisplay } from "../../hooks/useDisplay";
import LoadingForm from "../../components/Loading/LoadingForm/LoadingForm";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setDisplayItem } = useDisplay();
  const auth = useAuth();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = await authSignIn({
      username,
      password,
    });
    if (!data.ok) {
      setDisplayItem(data.message, false);
    } else {
      setDisplayItem(`Welcome user @${data.user.username}!`);
      auth.setUser(data.user);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {loading && <LoadingForm />}
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
