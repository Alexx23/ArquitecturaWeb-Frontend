import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/Sidebar";
import Footer from "../components/Footer";
import themeConfigs from "../configs/theme.config";
import ActorsPage from "./admin/ActorPage";
import AdminIndexPage from "./admin/AdminIndexPage";
import DirectorsPage from "./admin/DirectorsPage";
import DistributorsPage from "./admin/DistributorsPage";
import GenresPage from "./admin/GenresPage";
import MoviesPage from "./admin/MoviesPage";
import NationalitiesPage from "./admin/NationalitiesPage";
import ReportsPage from "./admin/ReportsPage";
import RoomsPage from "./admin/RoomsPage";
import SessionsPage from "./admin/SessionsPage";
import TicketsPage from "./admin/TicketsPage";
import UsersPage from "./admin/UsersPage";
import Error404 from "./errors/Error404";

function AdminLayout() {
  const [sidebarMobileShow, setSidebarMobileShow] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

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
    <>
      <ThemeProvider
        theme={themeConfigs.custom({ mode: darkMode ? "dark" : "light" })}
      >
        <CssBaseline />

        <AdminNavbar
          darkMode={darkMode}
          switchDarkMode={switchDarkMode}
          sidebarMobileShow={sidebarMobileShow}
          onClickSidebarMobile={() => setSidebarMobileShow(!sidebarMobileShow)}
        />
        <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
          <AdminSidebar sidebarMobileShow={sidebarMobileShow} />

          <div className="min-h-screen relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
            <main>
              <Routes>
                <Route path="/" element={<AdminIndexPage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/genres" element={<GenresPage />} />
                <Route path="/actors" element={<ActorsPage />} />
                <Route path="/directors" element={<DirectorsPage />} />
                <Route path="/distributors" element={<DistributorsPage />} />
                <Route path="/nationalities" element={<NationalitiesPage />} />
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/sessions" element={<SessionsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/tickets" element={<TicketsPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="*" element={<Error404 goTo="/admin" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default AdminLayout;
