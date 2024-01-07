import { Ticket } from "../../../api/TicketAPI";
import { formatDate } from "../../../utils/DateUtils";

interface Props {
  ticket: Ticket;
}

export default function TicketCell({ ticket }: Props) {
  return (
    <>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          <div className="text-base font-semibold text-gray-900 dark:text-white">
            {ticket.user.name}
          </div>
          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {ticket.user.username}
          </div>
        </div>
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          <div className="text-base font-semibold text-gray-900 dark:text-white">
            {ticket.session.movie.name}
          </div>
          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {ticket.session.movie.original_title}
          </div>
        </div>
      </td>
      <td className="max-w-sm flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          <div className="text-base font-semibold text-gray-900 dark:text-white">
            {ticket.session.room.name}
          </div>
          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {formatDate(new Date(ticket.session.datetime))}
          </div>
        </div>
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {formatDate(new Date(ticket.created_at))}
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {ticket.row}
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {ticket.col}
      </td>
    </>
  );
}
