import { useEffect, useState } from "react";

export function useSession() {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    // Check if session ID already exists in sessionStorage
    let currentSession = sessionStorage.getItem("sahida_birthday_session");
    
    if (!currentSession) {
      // Generate a new UUID if none exists
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        currentSession = crypto.randomUUID();
      } else {
        currentSession = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }
      sessionStorage.setItem("sahida_birthday_session", currentSession);
    }
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionId(currentSession);
  }, []);

  return sessionId;
}
