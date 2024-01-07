import {
  ReactNode,
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../api/AuthAPI";
import { User } from "../api/UserAPI";

export interface UserContextInterface {
  user: User | null;
  setUser?: (user: User | null) => void;
  logout?: () => void;
}

const UserContext = createContext<UserContextInterface>({
  user: null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    AuthAPI.logout().finally(() => {
      setUser(null);
      localStorage.clear();
      window.location.href = "/login";
    });
  };

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user");
    if (userLocalStorage != null) {
      setUser(JSON.parse(userLocalStorage));
      console.log("usuario añadido desde caché");
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    if (localStorage.getItem("user") == null) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const value = {
    user,
    setUser,
    logout,
  };

  return createElement(UserContext.Provider, { value }, children);
};
export default UserProvider;
export const useUser = () => useContext(UserContext);
