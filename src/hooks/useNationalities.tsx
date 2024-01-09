import { useEffect, useState } from "react";
import NationalityAPI, { Nationality } from "../api/NationalityAPI";
import { publish } from "../utils/CustomEvents";

function useNationalities(inputName: string) {
  const [nationalities, setNationalities] = useState<Nationality[]>([]);
  const [actualPage, setActualPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [inputChanged, setInputChanged] = useState(false);

  const requestNationalities = (pageToRequest: number) => {
    if (isLoading && pageToRequest != 1) return;
    if (pageToRequest <= 0) return;
    setIsLoading(true);

    NationalityAPI.getNationalities(
      pageToRequest,
      inputName.length ? inputName : null
    )
      .then((res) => {
        setNationalities(res.data);
        setActualPage(res.actual_page);
        setNextPage(res.has_more ? res.actual_page + 1 : -1);
        setPageSize(res.page_size);
        setTotalSize(res.total_size);
      })
      .catch((err) => {
        publish(
          "showApiErrorMessage",
          "No se ha podido cargar la lista de nacionalidades correctamente. Por favor, inténtalo de nuevo en unos minutos."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const requestAllNationalities = () => {
    setIsLoading(true);
    NationalityAPI.getAllNationalities()
      .then((res) => {
        setNationalities(
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
          "No se ha podido cargar la lista de nacionalidades correctamente. Por favor, inténtalo de nuevo en unos minutos."
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
      requestNationalities(1);
    }, 800);
    return () => clearTimeout(timer);
  }, [inputChanged, inputName]);

  return {
    nationalities,
    isLoading,
    actualPage,
    nextPage,
    pageSize,
    totalSize,
    setInputChanged,
    fetchNext: () => requestNationalities(nextPage),
    fetchCurrent: () => requestNationalities(actualPage),
    fetchPrevious: () => requestNationalities(actualPage - 1),
    fetchAll: () => requestAllNationalities(),
  };
}

export default useNationalities;
