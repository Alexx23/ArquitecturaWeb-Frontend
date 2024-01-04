import { Navigate, Outlet, useLocation } from "react-router-dom";
import { User } from "../api/UserAPI";

interface Props {
  allowedRoles: number[];
}

const RequireAuth = ({ allowedRoles }: Props) => {
  const location = useLocation();
  const localStorageUser = localStorage.getItem("user");
  const isUserLoggedIn = localStorageUser != null;
  if (!isUserLoggedIn) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  const user: User = JSON.parse(localStorageUser);
  const isAllowed = allowedRoles.some((roleId) => user.role.id === roleId);
  if (!isAllowed) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return <Outlet />;
};
export default RequireAuth;
