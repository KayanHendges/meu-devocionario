import { createContext, useState } from "react";

export const AppContext = createContext({} as IAppContext);

export default function AppProvider({ children }: { children: JSX.Element }) {
  const [header, setHeader] = useState<string>("");
  const [displayHeader, setDisplayHeader] = useState<boolean>(true);

  return (
    <AppContext.Provider
      value={{ header, setHeader, displayHeader, setDisplayHeader }}
    >
      {children}
    </AppContext.Provider>
  );
}
