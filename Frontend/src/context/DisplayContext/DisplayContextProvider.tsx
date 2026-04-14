import type { JSX } from "react";
import { DisplayContext } from "./DisplayContext";
import ResponseDisplay from "../../components/ResponseDisplay/ResponseDisplay";

function ResponseContextProvider({ children }: { children: JSX.Element }) {
  const { setDisplayList, element } = ResponseDisplay();

  return (
    <DisplayContext.Provider value={{ setDisplayList }}>
      {element}
      {children}
    </DisplayContext.Provider>
  );
}

export default ResponseContextProvider;
