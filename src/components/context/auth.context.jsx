import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   if (token) {
  //     axios
  //       .get("/", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then(({ data }) => {
  //         setUser(data);
  //         setIsAuthenticated(true);
  //         setReady(true);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching profile:", error);
  //         setUser(null);
  //         setIsAuthenticated(false);
  //         setReady(true);
  //       });
  //   } else {
  //     setReady(true);
  //   }
  // }, []);
  useEffect(() => {
    const token = localStorage.getItem("tokenUser");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (token) {
      if (storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
        setReady(true);
      } else {
        axios
          .get("/", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(({ data }) => {
            setUser(data);
            setIsAuthenticated(true);
            setReady(true);
          })
          .catch((error) => {
            console.error("Error fetching profile:", error);
            setUser(null);
            setIsAuthenticated(false);
            setReady(true);
          });
      }
    } else {
      setReady(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, ready, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
}
