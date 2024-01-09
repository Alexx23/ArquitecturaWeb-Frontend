import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/client/Navbar";
import ApiErrorModal from "../components/modals/ApiErrorModal";
import SuccessModal from "../components/modals/SuccessModal";
import themeConfigs from "../configs/theme.config";
import MovieListPage from "./movie/MovieListPage";
import MovieDetailsPage from "./movie/MovieDetailsPage";
import Error404 from "./errors/Error404";

interface Props {
  darkMode: boolean;
}

function MoviesLayout({ darkMode }: Props) {
  return (
    <>
      <ThemeProvider
        theme={themeConfigs.custom({ mode: darkMode ? "dark" : "light" })}
      >
        <CssBaseline />
        <Routes>
          <Route path="/" element={<MovieListPage />} />
          <Route path="/:movieId" element={<MovieDetailsPage />} />
          <Route path="*" element={<Error404 goTo="/movies" />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}
export default MoviesLayout;
