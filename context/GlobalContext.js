"use client";

import getUnreadMessages from "@/app/actions/getUnreadMessages";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessages().then((res) => {
        if (res.count) {
          setUnreadCount(res.count);
        }
      });
    }
  }, [getUnreadMessages, session]);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
