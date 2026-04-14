import { useState } from "react";
import FormInput from "../../components/Inputs/FormInput/FormInput";
import { authSignIn } from "../../services/auth";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await authSignIn({
      username,
      password,
    });
    if (data.ok) {
      auth.setUser(data.user);
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <header>
        <h1>Sign In</h1>
      </header>
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
      <Link to="/signup">Create an account</Link>
      <button type="submit">Login</button>
    </form>
  );
}

export default SignIn;
