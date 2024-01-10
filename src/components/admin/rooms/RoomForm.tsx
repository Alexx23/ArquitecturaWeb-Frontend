import { useForm } from "react-hook-form";
import { Room, RoomCreate } from "../../../api/RoomAPI";
import useGenres from "../../../hooks/useGenres";
import { useEffect, useState } from "react";
import useDirectors from "../../../hooks/useDirectors";
import useDistributors from "../../../hooks/useDistributors";
import useNationalities from "../../../hooks/useNationalities";
import useAgeClassifications from "../../../hooks/useAgeClassification";

interface Props {
  room: Room | false | null;
  onSubmit: (room: RoomCreate) => void;
}

function RoomForm({ room, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RoomCreate>(
    room
      ? {
          defaultValues: {
            name: room.name,
            depth: room.depth,
            seats: room.seats,
          },
        }
      : {}
  );

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nombre
            </label>
            <input
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              {...register("name", {
                required: "Nombre necesario",
                minLength: {
                  value: 1,
                  message: "Nombre necesario",
                },
              })}
            />
            {errors.name && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.name.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Profundidad
            </label>
            <input
              type="number"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              {...register("depth", {
                required: "Año necesario",
                min: {
                  value: 1,
                  message: "Año necesario",
                },
              })}
            />
            {errors.depth && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.depth.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Asientos por fila
            </label>
            <input
              type="number"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              {...register("seats", {
                required: "Duración necesaria",
                min: {
                  value: 1,
                  message: "Duración necesaria",
                },
              })}
            />
            {errors.seats && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.seats.message + ""}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
        <button
          onClick={handleSubmit(onSubmit)}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="submit"
        >
          {(room ? "Guardar " : "Crear ") + "Sala"}
        </button>
      </div>
    </>
  );
}
export default RoomForm;
