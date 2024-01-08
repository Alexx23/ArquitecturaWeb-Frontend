import { useEffect, useState } from "react";
import CommentAPI, { Comment } from "../api/CommentAPI";
import { publish } from "../utils/CustomEvents";

function useComments(movieId: number, accumulable: boolean = false) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [actualPage, setActualPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [inputChanged, setInputChanged] = useState(false);

  const requestComments = (pageToRequest: number) => {
    if (isLoading && pageToRequest != 1) return;
    if (pageToRequest <= 0) return;
    setIsLoading(true);

    CommentAPI.getComments(movieId, pageToRequest)
      .then((res) => {
        if (accumulable) {
          setComments((prevComments) => [...prevComments, ...res.data]);
        } else {
          setComments(res.data);
        }
        setActualPage(res.actual_page);
        setNextPage(res.has_more ? res.actual_page + 1 : -1);
        setPageSize(res.page_size);
        setTotalSize(res.total_size);
      })
      .catch((err) => {
        publish(
          "showApiErrorMessage",
          "No se ha podido cargar la lista de comentarios correctamente. Por favor, inténtalo de nuevo en unos minutos."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    comments,
    isLoading,
    actualPage,
    nextPage,
    pageSize,
    totalSize,
    setInputChanged,
    fetchNext: () => requestComments(nextPage),
    fetchCurrent: () => requestComments(actualPage),
    fetchPrevious: () => requestComments(actualPage - 1),
    setComments,
    setTotalSize,
  };
}

export default useComments;
