import { useEffect, useState } from "react";
import DistributorAPI, { Distributor } from "../api/DistributorAPI";
import { publish } from "../utils/CustomEvents";

function useDistributors(inputName: string) {
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [actualPage, setActualPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [inputChanged, setInputChanged] = useState(false);

  const requestDistributors = (pageToRequest: number) => {
    if (isLoading && pageToRequest != 1) return;
    if (pageToRequest <= 0) return;
    setIsLoading(true);

    DistributorAPI.getDistributors(
      pageToRequest,
      inputName.length ? inputName : null
    )
      .then((res) => {
        setDistributors(res.data);
        setActualPage(res.actual_page);
        setNextPage(res.has_more ? res.actual_page + 1 : -1);
        setPageSize(res.page_size);
        setTotalSize(res.total_size);
      })
      .catch((err) => {
        publish(
          "showApiErrorMessage",
          "No se ha podido cargar la lista de distribuidores correctamente. Por favor, inténtalo de nuevo en unos minutos."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const requestAllDistributors = () => {
    setIsLoading(true);
    DistributorAPI.getAllDistributors()
      .then((res) => {
        setDistributors(
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
          "No se ha podido cargar la lista de distribuidores correctamente. Por favor, inténtalo de nuevo en unos minutos."
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
      requestDistributors(1);
    }, 800);
    return () => clearTimeout(timer);
  }, [inputChanged, inputName]);

  return {
    distributors,
    isLoading,
    actualPage,
    nextPage,
    pageSize,
    totalSize,
    setInputChanged,
    fetchNext: () => requestDistributors(nextPage),
    fetchCurrent: () => requestDistributors(actualPage),
    fetchPrevious: () => requestDistributors(actualPage - 1),
    fetchAll: () => requestAllDistributors(),
  };
}

export default useDistributors;
