import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Favorite } from "../../api/FavoriteAPI";
import DataTable from "../../components/admin/DataTable";
import UserFavoriteCell from "../../components/client/UserFavoriteCell";
import useFavorites from "../../hooks/useFavorites";

export default function UserFavoritesPage() {
  const {
    favorites,
    nextPage,
    actualPage,
    pageSize,
    totalSize,
    isLoading,
    fetchNext,
    fetchPrevious,
  } = useFavorites();

  const navigate = useNavigate();

  useEffect(() => {
    fetchNext();
  }, []);

  return (
    <>
      <div className="pb-40 grid grid-cols-1 xl:grid-cols-5 xl:gap-4 dark:bg-gray-900">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Mis tickets
          </h1>
        </div>

        <div className="col-span-3">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <DataTable
              data={favorites}
              title={"Favoritos"}
              columns={["Película"]}
              actualPage={actualPage}
              pageSize={pageSize}
              totalSize={totalSize}
              nextPage={nextPage}
              isLoading={isLoading}
              canEdit={false}
              canSearch={false}
              customUpdateName={"Ver ficha"}
              customUpdateIcon={"film"}
              renderCell={(favorite: Favorite) => (
                <UserFavoriteCell favorite={favorite} />
              )}
              onNextPage={fetchNext}
              onPreviousPage={fetchPrevious}
              onSearch={() => {}}
              onDelete={() => {}}
              onCreate={() => {}}
              onUpdate={() => {}}
              onCustomUpdate={(favorite: Favorite) =>
                navigate("/movies/" + favorite.movie.id)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
