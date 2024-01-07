import { Director } from "../../../api/DirectorAPI";

interface Props {
  director: Director;
}

export default function DirectorCell({ director }: Props) {
  return (
    <>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {director.name}
      </td>
    </>
  );
}
