import type { JSX } from "react";
import { DisplayContext } from "./DisplayContext";
import ResponseDisplay from "../../components/ResponseDisplay/ResponseDisplay";

function ResponseContextProvider({ children }: { children: JSX.Element }) {
  const { setDisplayItem, element } = ResponseDisplay();

  return (
    <DisplayContext value={{ setDisplayItem }}>
      {element}
      {children}
    </DisplayContext>
  );
}

export default ResponseContextProvider;
