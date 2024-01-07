import { Actor } from "../../../api/ActorAPI";

interface Props {
  actor: Actor;
}

export default function ActorCell({ actor }: Props) {
  return (
    <>
      <td className="max-w-sm p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {actor.name}
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {actor.movie_list.length}
      </td>
    </>
  );
}
