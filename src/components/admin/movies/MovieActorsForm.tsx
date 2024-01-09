import { useForm } from "react-hook-form";
import { Movie, MovieCreate } from "../../../api/MovieAPI";
import { useEffect, useMemo, useState } from "react";
import useActors from "../../../hooks/useActors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  movie: Movie | false | null;
  onSubmit: (actorsIds: number[]) => void;
}

function MovieActorForm({ movie, onSubmit }: Props) {
  const { actors, fetchAll: fetchAllActors } = useActors("");
  const [actorIds, setActorIds] = useState<number[]>([]);
  const [inputName, setInputName] = useState("");

  const handleDeleteActor = (actorId: number) => {
    setActorIds((prev) => prev.filter((id) => id !== actorId));
  };

  const handleAddActor = (actorId: number) => {
    setActorIds((prev) => [...prev, actorId]);
  };

  const actorsUnselected = useMemo(() => {
    return actors.filter((actor) => !actorIds.includes(actor.id));
  }, [actors, actorIds]);

  const actorsFiltered = useMemo(() => {
    return actorsUnselected.filter((actor) =>
      actor.name.toLocaleLowerCase().includes(inputName.toLocaleLowerCase())
    );
  }, [actorsUnselected, inputName]);

  useEffect(() => {
    if (!movie) return;
    setActorIds(movie?.actor_list.map((actor) => actor.id) ?? []);
  }, [movie, actors]);

  useEffect(() => {
    fetchAllActors();
  }, []);

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Actores seleccionados
            </label>
            {actorIds.length === 0 && (
              <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-900 dark:text-gray-300">
                No hay actores seleccionados
              </span>
            )}
            {actorIds.map((actorId) => (
              <span
                key={actorId}
                id="badge-dismiss-default"
                className="inline-flex items-center px-2 py-1 my-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-100"
              >
                {actors.find((actor) => actor.id === actorId)?.name}
                <button
                  onClick={() => handleDeleteActor(actorId)}
                  type="button"
                  className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-100"
                  data-dismiss-target="#badge-dismiss-default"
                  aria-label="Remove"
                >
                  <svg
                    className="w-2 h-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
          <div className="col-span-4">
            <label className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
              Añadir nuevos actores
            </label>

            {actorsUnselected.length == 0 && (
              <p className="text-red-500 text-base italic">
                No hay nuevos actores disponibles para añadir
              </p>
            )}
            {actorsUnselected.length >= 1 && (
              <>
                <input
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  type="text"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Buscar actores"
                />
                {actorsFiltered.length >= 1 && (
                  <p className="text-gray-500 mt-2 text-base italic">
                    Selecciona el actor que quieres añadir
                  </p>
                )}
                <div className="rounded-md mt-2 max-h-40 overflow-x-hidden overflow-y-auto border-blue-200 border w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 bg-gray-100 dark:bg-gray-900">
                  {actorsFiltered.length === 0 && (
                    <span className="w-full italic inline-flex px-2 py-1 me-2 text-sm text-gray-800 dark:text-gray-300">
                      No hay actores con ese nombre
                    </span>
                  )}
                  {actorsFiltered.map((actor) => (
                    <span
                      onClick={() => handleAddActor(actor.id)}
                      key={actor.id}
                      className="w-full inline-flex px-2 py-1 me-2 text-sm font-medium text-gray-800 dark:text-gray-300 cursor-pointer"
                    >
                      {actor.name}
                      <FontAwesomeIcon
                        icon="plus"
                        className="w-4 h-4 text-gray-500 dark:text-gray-400 ml-auto"
                      />
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
        <button
          onClick={() => onSubmit(actorIds)}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="submit"
        >
          {(movie ? "Guardar " : "Crear ") + "Actores"}
        </button>
      </div>
    </>
  );
}
export default MovieActorForm;
