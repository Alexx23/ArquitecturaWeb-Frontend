import { useEffect, useState } from "react";
import ActorAPI, { Actor } from "../api/ActorAPI";
import { publish } from "../utils/CustomEvents";

function useActors(inputName: string) {
  const [actors, setActors] = useState<Actor[]>([]);
  const [actualPage, setActualPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [inputChanged, setInputChanged] = useState(false);

  const requestActors = (pageToRequest: number) => {
    if (isLoading && pageToRequest != 1) return;
    if (pageToRequest <= 0) return;
    setIsLoading(true);

    ActorAPI.getActors(pageToRequest, inputName.length ? inputName : null)
      .then((res) => {
        setActors(res.data);
        setActualPage(res.actual_page);
        setNextPage(res.has_more ? res.actual_page + 1 : -1);
        setPageSize(res.page_size);
        setTotalSize(res.total_size);
      })
      .catch((err) => {
        publish(
          "showApiErrorMessage",
          "No se ha podido cargar la lista de actores correctamente. Por favor, inténtalo de nuevo en unos minutos."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const requestAllActors = () => {
    setIsLoading(true);
    ActorAPI.getAllActors()
      .then((res) => {
        setActors(
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
          "No se ha podido cargar la lista de actores correctamente. Por favor, inténtalo de nuevo en unos minutos."
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
      requestActors(1);
    }, 800);
    return () => clearTimeout(timer);
  }, [inputChanged, inputName]);

  return {
    actors,
    isLoading,
    actualPage,
    nextPage,
    pageSize,
    totalSize,
    setInputChanged,
    fetchNext: () => requestActors(nextPage),
    fetchCurrent: () => requestActors(actualPage),
    fetchPrevious: () => requestActors(actualPage - 1),
    fetchAll: () => requestAllActors(),
  };
}

export default useActors;
