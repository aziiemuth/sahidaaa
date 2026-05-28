import { useEffect, useState } from "react";

let pageLoadSessionId = "";

export function useSession() {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    if (!pageLoadSessionId) {
      // Generate a new UUID on first mount per page load
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        pageLoadSessionId = crypto.randomUUID();
      } else {
        pageLoadSessionId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }
    }
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionId(pageLoadSessionId);
  }, []);

  return sessionId;
}
