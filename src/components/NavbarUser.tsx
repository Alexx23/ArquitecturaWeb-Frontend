import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getAvatarUrl } from "../utils/RandomImage";
import RoleEnum from "../utils/RoleEnum";

export default function NavbarUser() {
  const { user, logout } = useUser();

  return user ? (
    <div className="flex items-center ml-3">
      <div>
        <button
          type="button"
          className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          aria-expanded="false"
          data-dropdown-toggle="dropdown-profile"
        >
          <span className="sr-only">Menú usuario</span>
          <img
            className="w-10 h-10 rounded-full"
            src={getAvatarUrl(user.id)}
            alt="User photo"
          />
        </button>
      </div>
      <div
        id="dropdown-profile"
        className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
      >
        <div className="px-4 py-3" role="none">
          <p className="text-sm text-gray-900 dark:text-white" role="none">
            {user?.name}
          </p>
          <p
            className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
            role="none"
          >
            {user?.email}
          </p>
        </div>
        <ul className="py-1" role="none">
          {user.role.id == RoleEnum.ADMIN && (
            <li>
              <Link
                to="/admin"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Panel
              </Link>
            </li>
          )}
          <li>
            <a
              onClick={() => logout?.()}
              className="cursor-pointer block px-4 py-2 text-sm text-red-700 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-600 dark:hover:text-white"
              role="menuitem"
            >
              Cerrar sesión
            </a>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <></>
  );
}
