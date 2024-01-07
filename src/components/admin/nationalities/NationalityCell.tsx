import { Nationality } from "../../../api/NationalityAPI";

interface Props {
  nationality: Nationality;
}

export default function NationalityCell({ nationality }: Props) {
  return (
    <>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {nationality.name}
      </td>
    </>
  );
}
