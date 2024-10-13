import { createContext, useEffect, useState } from "react";
import axios from "axios";

// Tạo Context
export const UserContext = createContext({});

// Tạo Provider
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Thêm trạng thái xác thực

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // Gọi API để lấy thông tin người dùng dựa trên token
      axios
        .get('/', { 
          headers: { 
            Authorization: `Bearer ${token}` 
          } 
        })
        .then(({ data }) => {
          setUser(data);
          setIsAuthenticated(true); // Đánh dấu người dùng là đã xác thực
          setReady(true);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setUser(null);
          setIsAuthenticated(false); // Đánh dấu người dùng là chưa xác thực
          setReady(true);
        });
    } else {
      setReady(true);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready, isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}
