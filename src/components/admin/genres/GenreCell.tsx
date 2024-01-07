import { Genre } from "../../../api/GenreAPI";

interface Props {
  genre: Genre;
}

export default function GenreCell({ genre }: Props) {
  return (
    <>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {genre.name}
      </td>
    </>
  );
}
