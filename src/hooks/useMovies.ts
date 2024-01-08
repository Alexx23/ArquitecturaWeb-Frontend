import { useEffect, useState } from "react";
import MovieAPI, { Movie } from "../api/MovieAPI";
import { publish } from "../utils/CustomEvents";

function useMovies(inputName: string, accumulable: boolean = false) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [actualPage, setActualPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [inputChanged, setInputChanged] = useState(false);

  const requestMovies = (pageToRequest: number) => {
    if (isLoading && pageToRequest != 1) return;
    if (pageToRequest <= 0) return;
    setIsLoading(true);

    MovieAPI.getMovies(pageToRequest, inputName.length ? inputName : null)
      .then((res) => {
        if (accumulable) {
          setMovies((prevMovies) => [...prevMovies, ...res.data]);
        } else {
          setMovies(res.data);
        }
        setActualPage(res.actual_page);
        setNextPage(res.has_more ? res.actual_page + 1 : -1);
        setPageSize(res.page_size);
        setTotalSize(res.total_size);
      })
      .catch((err) => {
        publish(
          "showApiErrorMessage",
          "No se ha podido cargar la lista de películas correctamente. Por favor, inténtalo de nuevo en unos minutos."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const requestAllMovies = () => {
    setIsLoading(true);
    MovieAPI.getAllMovies()
      .then((res) => {
        setMovies(
          res.sort((a, b) => {
            if (a.name > b.name) return 1;
            return -1;
          })
        );
        setActualPage(-1);
        setNextPage(-1);
        setPageSize(-1);
        setTotalSize(-1);
      })
      .catch((err) => {
        publish(
          "showApiErrorMessage",
          "No se ha podido cargar la lista de películas correctamente. Por favor, inténtalo de nuevo en unos minutos."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!inputChanged) return;
    setIsLoading(true);
    const timer = setTimeout(() => {
      requestMovies(1);
    }, 800);
    return () => clearTimeout(timer);
  }, [inputChanged, inputName]);

  return {
    movies,
    isLoading,
    actualPage,
    nextPage,
    pageSize,
    totalSize,
    setInputChanged,
    fetchNext: () => requestMovies(nextPage),
    fetchCurrent: () => requestMovies(actualPage),
    fetchPrevious: () => requestMovies(actualPage - 1),
    fetchAll: () => requestAllMovies(),
  };
}

export default useMovies;
