import { Movie } from "../../../api/MovieAPI";

interface Props {
  movie: Movie;
}

export default function MovieCell({ movie }: Props) {
  return (
    <>
      <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          <div className="text-base font-semibold text-gray-900 dark:text-white">
            {movie.name}
          </div>
          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {movie.original_title}
          </div>
        </div>
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {movie.year}
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {movie.duration}
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {movie.web}
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {movie.genre.name}
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {movie.nationality.name}
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {movie.distributor.name}
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {movie.director.name}
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {movie.age_classification.name}
      </td>
    </>
  );
}
