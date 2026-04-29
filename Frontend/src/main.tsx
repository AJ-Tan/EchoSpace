import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ResponseContextProvider from "./context/DisplayContext/DisplayContextProvider.tsx";
import { AuthContextProvider } from "./context/AuthContext/AuthContextProvider.tsx";
import MessageContextProvider from "./context/MessageContext/MessageContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ResponseContextProvider>
      <AuthContextProvider>
        <MessageContextProvider>
          <App />
        </MessageContextProvider>
      </AuthContextProvider>
    </ResponseContextProvider>
  </StrictMode>,
);
