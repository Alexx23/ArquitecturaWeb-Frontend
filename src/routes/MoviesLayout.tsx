import { Route, Routes } from "react-router-dom";
import Error404 from "./errors/Error404";
import MovieDetailsPage from "./movie/MovieDetailsPage";
import MovieListPage from "./movie/MovieListPage";

function MoviesLayout() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MovieListPage />} />
        <Route path="/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<Error404 goTo="/movies" />} />
      </Routes>
    </>
  );
}
export default MoviesLayout;
