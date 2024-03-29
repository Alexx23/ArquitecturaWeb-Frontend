import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  sidebarMobileShow: boolean;
}

const AdminSidebar = ({ sidebarMobileShow }: Props) => {
  const { pathname } = useLocation();

  const isPathActive = (path: string[]) => {
    return path.some((p) => pathname.toLocaleLowerCase().includes(p));
  };

  const [viewDropdownMovies, setViewDropdownMovies] = useState(false);

  useEffect(() => {
    if (
      isPathActive([
        "movies",
        "genres",
        "actors",
        "directors",
        "distributors",
        "nationalities",
      ])
    ) {
      setViewDropdownMovies(true);
    } else {
      setViewDropdownMovies(false);
    }
  }, [pathname]);

  return (
    <>
      <aside
        className={
          "fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width" +
          (sidebarMobileShow ? "" : " hidden")
        }
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <ul className="pb-2 space-y-2">
                <li>
                  <Link
                    to="/admin"
                    className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <FontAwesomeIcon
                      icon="money-bills"
                      className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    />
                    <span className="ml-3">Ventas</span>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setViewDropdownMovies(!viewDropdownMovies)}
                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <FontAwesomeIcon
                      icon="film"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    />
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      Cartelera
                    </span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <ul
                    className={
                      "space-y-2 py-2" + (viewDropdownMovies ? "" : " hidden")
                    }
                  >
                    <li>
                      <Link
                        to="/admin/movies"
                        className={
                          "text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700" +
                          (isPathActive(["movies"])
                            ? " bg-gray-100 dark:bg-gray-700"
                            : "")
                        }
                      >
                        Películas
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/genres"
                        className={
                          "text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700" +
                          (isPathActive(["genres"])
                            ? " bg-gray-100 dark:bg-gray-700"
                            : "")
                        }
                      >
                        Géneros
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/actors"
                        className={
                          "text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700" +
                          (isPathActive(["actors"])
                            ? " bg-gray-100 dark:bg-gray-700"
                            : "")
                        }
                      >
                        Actores
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/directors"
                        className={
                          "text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700" +
                          (isPathActive(["directors"])
                            ? " bg-gray-100 dark:bg-gray-700"
                            : "")
                        }
                      >
                        Directores
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/distributors"
                        className={
                          "text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700" +
                          (isPathActive(["distributors"])
                            ? " bg-gray-100 dark:bg-gray-700"
                            : "")
                        }
                      >
                        Distribuidores
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/nationalities"
                        className={
                          "text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700" +
                          (isPathActive(["nationalities"])
                            ? " bg-gray-100 dark:bg-gray-700"
                            : "")
                        }
                      >
                        Nacionalidades
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    to="/admin/rooms"
                    className={
                      "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700" +
                      (isPathActive(["rooms"])
                        ? " bg-gray-100 dark:bg-gray-700"
                        : "")
                    }
                  >
                    <FontAwesomeIcon
                      icon="house"
                      className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    />
                    <span className="ml-3">Salas</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/sessions"
                    className={
                      "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700" +
                      (isPathActive(["sessions"])
                        ? " bg-gray-100 dark:bg-gray-700"
                        : "")
                    }
                  >
                    <FontAwesomeIcon
                      icon="calendar-week"
                      className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    />
                    <span className="ml-3">Sesiones</span>
                  </Link>
                </li>
                <Divider />
                <li>
                  <Link
                    to="/admin/reports"
                    className={
                      "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700" +
                      (isPathActive(["reports"])
                        ? " bg-gray-100 dark:bg-gray-700"
                        : "")
                    }
                  >
                    <FontAwesomeIcon
                      icon="chart-simple"
                      className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    />
                    <span className="ml-3">Informes</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/tickets"
                    className={
                      "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700" +
                      (isPathActive(["tickets"])
                        ? " bg-gray-100 dark:bg-gray-700"
                        : "")
                    }
                  >
                    <FontAwesomeIcon
                      icon="ticket"
                      className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    />
                    <span className="ml-3">Tickets</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/users"
                    className={
                      "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700" +
                      (isPathActive(["users"])
                        ? " bg-gray-100 dark:bg-gray-700"
                        : "")
                    }
                  >
                    <FontAwesomeIcon
                      icon="users"
                      className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    />
                    <span className="ml-3">Usuarios</span>
                  </Link>
                </li>
              </ul>
              <div className="pt-2 space-y-2">
                <a
                  href="https://github.com/Alexx23/ArquitecturaWeb-Frontend/"
                  target="_blank"
                  className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                  >
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                  <span className="ml-3">Repositorio de GitHub</span>
                </a>
                <a
                  href="mailto:support@filmy.com"
                  target="_blank"
                  className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-3">Ayuda</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90"></div>
    </>
  );
};
export default AdminSidebar;
