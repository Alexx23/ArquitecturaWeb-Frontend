import { User } from "../../../api/UserAPI";
import { formatDate } from "../../../utils/DateUtils";

interface Props {
  user: User;
}

export default function UserCell({ user }: Props) {
  return (
    <>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          <div className="text-base font-semibold text-gray-900 dark:text-white">
            {user.name}
          </div>
          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {user.username}
          </div>
        </div>
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {user.email}
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {user.ticket_list.length}
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {formatDate(new Date(user.created_at))}
      </td>
    </>
  );
}
