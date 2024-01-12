import {
  createContext,
  createElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import AuthAPI from "../api/AuthAPI";
import UserAPI, { User } from "../api/UserAPI";
import RoleEnum from "../utils/RoleEnum";

export interface UserContextInterface {
  user: User | null;
  setUser?: (user: User | null) => void;
  logout?: () => void;
}

const UserContext = createContext<UserContextInterface>({
  user: null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { pathname } = useLocation();

  const loggedUserPaths = ["profile", "tickets", "favorites"];

  const logout = () => {
    AuthAPI.logout()
      .catch((err) => {
        /* */
      })
      .finally(() => {
        // Si es admin
        if (user?.role.id == RoleEnum.ADMIN) {
          window.location.href = "/login";
        }
        // Si está en una ruta de usuario logueado
        if (loggedUserPaths.some((path) => pathname.includes(path))) {
          window.location.href = "/login";
        }
        setUser(null);
        localStorage.clear();
      });
  };

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user");
    if (userLocalStorage != null) {
      UserAPI.getUser()
        .then((user) => {
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          console.debug("[Context] Usuario actualizado");
        })
        .catch(() => {
          console.debug("[Context] Usuario sin sesión");
          logout();
        });
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
