import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ClientNavbar from "../components/client/ClientNavbar";
import ApiErrorModal from "../components/modals/ApiErrorModal";
import SuccessModal from "../components/modals/SuccessModal";
import themeConfigs from "../configs/theme.config";
import MovieListPage from "./client/MovieListPage";
import MovieDetailsPage from "./client/MovieDetailsPage";
import Error404 from "./errors/Error404";

function ClientMoviesPage() {
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
        <ClientNavbar darkMode={darkMode} switchDarkMode={switchDarkMode} />
        <CssBaseline />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<MovieListPage />} />
            <Route path="/:movieId" element={<MovieDetailsPage />} />
            <Route path="*" element={<Error404 goTo="/movies" />} />
          </Routes>
        </main>
        <ApiErrorModal />
        <SuccessModal />
      </ThemeProvider>
    </>
  );
}
export default ClientMoviesPage;
