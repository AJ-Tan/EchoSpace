import { useEffect, useState } from "react";
import "./App.css";
import { createHashRouter, RouterProvider } from "react-router";
import { routes } from "./routes/routes";
import { authProtected } from "./services/auth";
import { useAuth } from "./hooks/useAuth";
import LoadingComponent from "./components/Loading/LoadingComponent/LoadingComponent";

function App() {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuth();

  useEffect(() => {
    authProtected().then((data) => {
      if (data.ok) {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, [setUser]);

  if (loading)
    return (
      <div className="loading-page">
        <LoadingComponent />
      </div>
    );
  const router = createHashRouter(routes(user));
  return <RouterProvider router={router} />;
}

export default App;
