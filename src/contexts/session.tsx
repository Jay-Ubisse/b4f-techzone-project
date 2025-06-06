import { createContext, useContext, useState } from "react";

interface SessionContextProps {
  session: { id: string; name: string; email: string };
  clearSession: () => void;
  saveSession: ({
    user,
  }: {
    user: { id: string; name: string; email: string };
  }) => void;
}

const SessionContext = createContext<SessionContextProps>({
  session: { email: "", id: "", name: "" },
  clearSession: () => {},
  saveSession: () => {},
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState({ email: "", id: "", name: "" });

  function clearSession() {
    setSession({ email: "", id: "", name: "" });
  }

  function saveSession({
    user,
  }: {
    user: { id: string; name: string; email: string };
  }) {
    setSession({ email: user.email, name: user.name, id: user.id });
  }

  return (
    <SessionContext.Provider value={{ session, clearSession, saveSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(SessionContext);
  return session;
};
