import { Session } from "../../../api/SessionAPI";
import { formatDate, formatHour } from "../../../utils/DateUtils";

interface Props {
  session: Session;
}

export default function SessionCell({ session }: Props) {
  return (
    <>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          <div className="text-base font-semibold text-gray-900 dark:text-white">
            {formatHour(new Date(session.datetime))}
          </div>
          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {session.room.name}
          </div>
        </div>
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {session.movie.name}
      </td>
      <td className="max-w-sm p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {session.ticket_list.length}
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {session.room.cols * session.room.files}
      </td>
    </>
  );
}
