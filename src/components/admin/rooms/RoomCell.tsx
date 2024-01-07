import { Room } from "../../../api/RoomAPI";

interface Props {
  room: Room;
}

export default function RoomCell({ room }: Props) {
  return (
    <>
      <td className="max-w-sm p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {room.name}
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {room.files}
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {room.cols}
      </td>
    </>
  );
}
