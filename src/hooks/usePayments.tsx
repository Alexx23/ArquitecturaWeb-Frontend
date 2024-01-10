import { useEffect, useState } from "react";
import { Paginated } from "../api";
import PaymentAPI, { Payment } from "../api/PaymentAPI";
import UserAPI from "../api/UserAPI";
import { publish } from "../utils/CustomEvents";

function usePayments(inputName: string, sessionMode: boolean = false) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [actualPage, setActualPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [inputChanged, setInputChanged] = useState(false);

  const requestPayments = (pageToRequest: number) => {
    if (isLoading && pageToRequest != 1) return;
    if (pageToRequest <= 0) return;
    setIsLoading(true);

    let promise: Promise<Paginated<Payment>>;
    if (sessionMode) {
      promise = UserAPI.getPayments(pageToRequest);
    } else {
      promise = PaymentAPI.getPayments(
        pageToRequest,
        inputName.length ? inputName : null
      );
    }

    promise
      .then((res) => {
        setPayments(res.data);
        setActualPage(res.actual_page);
        setNextPage(res.has_more ? res.actual_page + 1 : -1);
        setPageSize(res.page_size);
        setTotalSize(res.total_size);
      })
      .catch((err) => {
        publish(
          "showApiErrorMessage",
          "No se ha podido cargar la lista de payments correctamente. Por favor, inténtalo de nuevo en unos minutos."
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
      requestPayments(1);
    }, 800);
    return () => clearTimeout(timer);
  }, [inputChanged, inputName]);

  return {
    payments,
    isLoading,
    actualPage,
    nextPage,
    pageSize,
    totalSize,
    setInputChanged,
    fetchNext: () => requestPayments(nextPage),
    fetchCurrent: () => requestPayments(actualPage),
    fetchPrevious: () => requestPayments(actualPage - 1),
  };
}

export default usePayments;
