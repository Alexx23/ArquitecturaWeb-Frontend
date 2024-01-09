import { useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/client/Navbar";
import IndexPage from "./index/IndexPage";
import LoginPage from "./index/LoginPage";
import RegisterPage from "./index/RegisterPage";
import TermsConditionsPage from "./index/TermsConditionsPage";
import PrivacyPolicyPage from "./index/PrivacyPolicyPage";
import RequireAuth from "../utils/RequireAuth";
import RoleEnum from "../utils/RoleEnum";
import ProfilePage from "./index/ProfilePage";
import MoviesLayout from "./MoviesLayout";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import themeConfigs from "../configs/theme.config";

function IndexLayout() {
  const [darkMode, setDarkMode] = useState(false);

  const { pathname } = useLocation();

  const showNavbar = useMemo(() => {
    const excludedPaths = ["login", "register"];

    // Evitar que se muestre el navbar en las rutas de /login y /register
    if (excludedPaths.includes(pathname.toLocaleLowerCase().split("/")[1])) {
      return false;
    }

    return true;
  }, [pathname]);

  const fullScreen = useMemo(() => {
    const fullScreenPaths = ["login", "register"];

    // Permitir que se muestre en pantalla completa en las rutas de /login y /register
    if (fullScreenPaths.includes(pathname.toLocaleLowerCase().split("/")[1])) {
      return true;
    }

    // Permitir que se muestre en pantalla completa en las rutas de /movies/:movieId
    if (
      pathname.toLocaleLowerCase().split("/")[1] == "movies" &&
      pathname.toLocaleLowerCase().split("/")[2] != null
    ) {
      return true;
    }

    return false;
  }, [pathname]);

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
        {showNavbar && (
          <Navbar darkMode={darkMode} switchDarkMode={switchDarkMode} />
        )}
        <div
          className={
            fullScreen ? "" : "m-auto p-0.5 max-w-[1300px] min-h-screen"
          }
        >
          <div className={fullScreen ? "" : "mt-20 mx-8"}>
            <main>
              <Routes>
                <Route index element={<IndexPage darkMode={darkMode} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/terms-and-conditions"
                  element={<TermsConditionsPage />}
                />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/movies/*" element={<MoviesLayout />} />
                <Route
                  path="/profile"
                  element={
                    <>
                      <RequireAuth
                        allowedRoles={[RoleEnum.CLIENT, RoleEnum.ADMIN]}
                      />
                      <ProfilePage />
                    </>
                  }
                />
              </Routes>
            </main>
          </div>
          {showNavbar && <Footer />}
        </div>
      </ThemeProvider>
    </>
  );
}

export default IndexLayout;
