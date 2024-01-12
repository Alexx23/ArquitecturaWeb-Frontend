import { Favorite } from "../../api/FavoriteAPI";

interface Props {
  favorite: Favorite;
}

export default function UserFavoriteCell({ favorite }: Props) {
  return (
    <>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          <div className="text-base font-semibold text-gray-900 dark:text-white">
            {favorite.movie.name}
          </div>
          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {favorite.movie.original_title}
          </div>
        </div>
      </td>
    </>
  );
}
