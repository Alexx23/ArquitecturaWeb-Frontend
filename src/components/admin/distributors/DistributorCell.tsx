import { Distributor } from "../../../api/DistributorAPI";

interface Props {
  distributor: Distributor;
}

export default function DistributorCell({ distributor }: Props) {
  return (
    <>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {distributor.name}
      </td>
    </>
  );
}
