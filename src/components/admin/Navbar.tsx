import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

interface Props {
  sidebarMobileShow: boolean;
  onClickSidebarMobile(): void;
}

const AdminNavbar = ({ sidebarMobileShow, onClickSidebarMobile }: Props) => {
  const [darkMode, setDarkMode] = useState(false);

  const { user, logout } = useUser();

  const userImageUrl = "https://api.multiavatar.com/" + user?.name + ".svg";

  const switchDarkMode = () => {
    if (localStorage.getItem("dark-theme") == null) {
      return;
    }

    if (localStorage.getItem("dark-theme") == "true") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark-theme", "false");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark-theme", "true");
      setDarkMode(true);
    }
  };

  useEffect(() => {
    setDarkMode(localStorage.getItem("dark-theme") == "true");
  }, []);

  return (
    <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-18">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={onClickSidebarMobile}
              aria-expanded="true"
              aria-controls="sidebar"
              className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {!sidebarMobileShow && (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
              {sidebarMobileShow && (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
            <Link to="/admin" className="flex ml-2 md:mr-24">
              <img
                src="/img/logo.png"
                className="h-12 mr-3 rounded-xl"
                alt="Filmy logo"
              />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Panel de administración
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden"></div>
            <div className="hidden"></div>
            <div className="hidden"></div>
            <div className="hidden"></div>
            <div className="hidden"></div>
            <button
              onClick={switchDarkMode}
              data-tooltip-target="tooltip-toggle"
              type="button"
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              {!darkMode && (
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              )}
              {darkMode && (
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
            <div
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
            >
              Alternar modo oscuro
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
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
                    src={userImageUrl}
                    alt="User photo"
                  />
                </button>
              </div>
              <div
                id="dropdown-profile"
                className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="px-4 py-3" role="none">
                  <p
                    className="text-sm text-gray-900 dark:text-white"
                    role="none"
                  >
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
                  <li>
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Panel
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Editar perfil
                    </Link>
                  </li>
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
          </div>
        </div>
      </div>
    </nav>
  );
};
export default AdminNavbar;