import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ResponseContextProvider from "./context/DisplayContext/DisplayContextProvider.tsx";
import { AuthProvider } from "./context/AuthContext/AuthContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ResponseContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ResponseContextProvider>
  </StrictMode>,
);
