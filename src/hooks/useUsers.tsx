import { useEffect, useState } from "react";
import UserAPI, { User } from "../api/UserAPI";
import { publish } from "../utils/CustomEvents";

function useUsers(inputName: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [actualPage, setActualPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [inputChanged, setInputChanged] = useState(false);

  const requestUsers = (pageToRequest: number) => {
    if (isLoading && pageToRequest != 1) return;
    if (pageToRequest <= 0) return;
    setIsLoading(true);

    UserAPI.getUsers(pageToRequest, inputName.length ? inputName : null)
      .then((res) => {
        setUsers(res.data);
        setActualPage(res.actual_page);
        setNextPage(res.has_more ? res.actual_page + 1 : -1);
        setPageSize(res.page_size);
        setTotalSize(res.total_size);
      })
      .catch((err) => {
        publish(
          "showApiErrorMessage",
          "No se ha podido cargar la lista de usuarios correctamente. Por favor, inténtalo de nuevo en unos minutos."
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
      requestUsers(1);
    }, 800);
    return () => clearTimeout(timer);
  }, [inputChanged, inputName]);

  return {
    users,
    isLoading,
    actualPage,
    nextPage,
    pageSize,
    totalSize,
    setInputChanged,
    fetchNext: () => requestUsers(nextPage),
    fetchCurrent: () => requestUsers(actualPage),
    fetchPrevious: () => requestUsers(actualPage - 1),
  };
}

export default useUsers;
