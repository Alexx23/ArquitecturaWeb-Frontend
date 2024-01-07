import { useEffect, useState } from "react";
import TicketAPI, { Ticket } from "../api/TicketAPI";
import { publish } from "../utils/CustomEvents";

function useTickets(inputName: string) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [actualPage, setActualPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [inputChanged, setInputChanged] = useState(false);

  const requestTickets = (pageToRequest: number) => {
    if (isLoading && pageToRequest != 1) return;
    if (pageToRequest <= 0) return;
    setIsLoading(true);

    TicketAPI.getTickets(pageToRequest, inputName.length ? inputName : null)
      .then((res) => {
        setTickets(res.data);
        setActualPage(res.actual_page);
        setNextPage(res.has_more ? res.actual_page + 1 : -1);
        setPageSize(res.page_size);
        setTotalSize(res.total_size);
      })
      .catch((err) => {
        publish(
          "showApiErrorMessage",
          "No se ha podido cargar la lista de tickets correctamente. Por favor, inténtalo de nuevo en unos minutos."
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
      requestTickets(1);
    }, 800);
    return () => clearTimeout(timer);
  }, [inputChanged, inputName]);

  return {
    tickets,
    isLoading,
    actualPage,
    nextPage,
    pageSize,
    totalSize,
    setInputChanged,
    fetchNext: () => requestTickets(nextPage),
    fetchCurrent: () => requestTickets(actualPage),
    fetchPrevious: () => requestTickets(actualPage - 1),
  };
}

export default useTickets;
