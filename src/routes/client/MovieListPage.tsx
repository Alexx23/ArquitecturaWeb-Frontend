import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Movie } from "../../api/MovieAPI";
import MovieGrid from "../../components/client/MovieGrid";
import Loading from "../../components/Loading";
import uiConfigs from "../../configs/ui.configs";
import useMovies from "../../hooks/useMovies";

const MovieListPage = () => {
  const [inputName, setInputName] = useState("");

  const { movies, nextPage, isLoading, setInputChanged, fetchNextAvailable } =
    useMovies(inputName, true);

  useEffect(() => {
    fetchNextAvailable();
  }, []);

  return (
    <>
      <div className="m-auto p-0.5 max-w-[1366px]">
        <div className="mt-16 mx-5">
          <div className="py-8 text-center">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Buscador de películas
            </h1>
            <input
              value={inputName}
              onChange={(e) => {
                setInputChanged(true);
                setInputName(e.target.value);
              }}
              type="text"
              className="bg-gray-50 border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Buscar películas por nombre"
              required
            />
          </div>
          {movies.length == 0 && (
            <span className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">
              No se han encontrado resultados para tu búsqueda
            </span>
          )}
          {movies.length != 0 && (
            <span className="block mb-2 text-base font-semibold text-gray-900 dark:text-white">
              Resultados
            </span>
          )}
          <div className="mb-12">
            <MovieGrid movies={movies} />
          </div>
          <div className="text-center mb-8">
            {nextPage > 1 && (
              <button
                onClick={fetchNextAvailable}
                className="max-w-lg justify-center w-full text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isLoading ? (
                  <Loading color="fill-teal-500" size="h-6" />
                ) : (
                  <FontAwesomeIcon icon="plus" className="mr-2 w-4 h-4" />
                )}
                CARGAR MÁS
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieListPage;
