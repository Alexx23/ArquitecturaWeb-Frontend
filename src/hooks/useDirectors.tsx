import { useEffect, useState } from "react";
import DirectorAPI, { Director } from "../api/DirectorAPI";
import { publish } from "../utils/CustomEvents";

function useDirectors(inputName: string) {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [actualPage, setActualPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [inputChanged, setInputChanged] = useState(false);

  const requestDirectors = (pageToRequest: number) => {
    if (isLoading && pageToRequest != 1) return;
    if (pageToRequest <= 0) return;
    setIsLoading(true);

    DirectorAPI.getDirectors(pageToRequest, inputName.length ? inputName : null)
      .then((res) => {
        setDirectors(res.data);
        setActualPage(res.actual_page);
        setNextPage(res.has_more ? res.actual_page + 1 : -1);
        setPageSize(res.page_size);
        setTotalSize(res.total_size);
      })
      .catch((err) => {
        publish(
          "showApiErrorMessage",
          "No se ha podido cargar la lista de directores correctamente. Por favor, inténtalo de nuevo en unos minutos."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const requestAllDirectors = () => {
    setIsLoading(true);
    DirectorAPI.getAllDirectors()
      .then((res) => {
        setDirectors(
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
          "No se ha podido cargar la lista de directores correctamente. Por favor, inténtalo de nuevo en unos minutos."
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
      requestDirectors(1);
    }, 800);
    return () => clearTimeout(timer);
  }, [inputChanged, inputName]);

  return {
    directors,
    isLoading,
    actualPage,
    nextPage,
    pageSize,
    totalSize,
    setInputChanged,
    fetchNext: () => requestDirectors(nextPage),
    fetchCurrent: () => requestDirectors(actualPage),
    fetchPrevious: () => requestDirectors(actualPage - 1),
    fetchAll: () => requestAllDirectors(),
  };
}

export default useDirectors;
