import { useState } from "react";
import FavoriteAPI, { Favorite } from "../api/FavoriteAPI";
import { publish } from "../utils/CustomEvents";

function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [actualPage, setActualPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);

  const requestFavorites = (pageToRequest: number) => {
    if (isLoading && pageToRequest != 1) return;
    if (pageToRequest <= 0) return;
    setIsLoading(true);

    FavoriteAPI.getFavorites(pageToRequest)
      .then((res) => {
        setFavorites(res.data);
        setActualPage(res.actual_page);
        setNextPage(res.has_more ? res.actual_page + 1 : -1);
        setPageSize(res.page_size);
        setTotalSize(res.total_size);
      })
      .catch((err) => {
        publish(
          "showApiErrorMessage",
          "No se ha podido cargar la lista de favoritos correctamente. Por favor, inténtalo de nuevo en unos minutos."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    favorites,
    isLoading,
    actualPage,
    nextPage,
    pageSize,
    totalSize,
    fetchNext: () => requestFavorites(nextPage),
    fetchCurrent: () => requestFavorites(actualPage),
    fetchPrevious: () => requestFavorites(actualPage - 1),
  };
}

export default useFavorites;
