import { useForm } from "react-hook-form";
import { Session, SessionCreate } from "../../../api/SessionAPI";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import useRooms from "../../../hooks/useRooms";
import useMovies from "../../../hooks/useMovies";

interface LocalSessionCreate extends SessionCreate {
  hour: number;
  minute: number;
}

interface Props {
  session: Session | false | null;
  onSubmit: (session: SessionCreate) => void;
  selectedDate: Date;
}

function SessionForm({ session, onSubmit, selectedDate }: Props) {
  const { rooms, fetchAll: fetchAllRooms } = useRooms("");
  const { movies, fetchAll: fetchAllMovies } = useMovies("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LocalSessionCreate>(
    session
      ? {
          defaultValues: {
            movie_id: session.movie.id,
            room_id: session.room.id,
            hour: new Date(session.datetime).getHours(),
            minute: new Date(session.datetime).getMinutes(),
          },
        }
      : {}
  );

  const onPreSubmit = (data: LocalSessionCreate) => {
    const date = session ? new Date(session.datetime) : new Date(selectedDate);
    const payload: SessionCreate = {
      ...data,
      datetime: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        data.hour,
        data.minute
      ).toISOString(),
    };

    onSubmit(payload);
  };

  useEffect(() => {
    if (!session || !rooms.length || !movies.length) return;
    setValue("room_id", session.room.id);
    setValue("movie_id", session.movie.id);
  }, [session, rooms, movies]);

  useEffect(() => {
    fetchAllRooms();
    fetchAllMovies();
  }, []);

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Película
            </label>
            <select
              className="text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              {...register("movie_id", {
                required: "Película necesaria",
              })}
            >
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.name}
                </option>
              ))}
            </select>
            {errors.movie_id && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.movie_id.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sala
            </label>
            <select
              className="text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              {...register("room_id", {
                required: "Nacionalidad necesaria",
              })}
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
            {errors.room_id && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.room_id.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-3 sm:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Hora
            </label>
            <input
              type="number"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              {...register("hour", {
                required: "Hora necesaria",
                min: {
                  value: 0,
                  message: "Hora necesaria",
                },
                max: {
                  value: 23,
                  message: "Hora necesaria",
                },
              })}
            />
            {errors.hour && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.hour.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-3 sm:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Minuto
            </label>
            <input
              type="number"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              {...register("minute", {
                required: "Minuto necesario",
                min: {
                  value: 1,
                  message: "Minuto necesario",
                },
                max: {
                  value: 59,
                  message: "Minuto necesaria",
                },
              })}
            />
            {errors.minute && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.minute.message + ""}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
        <button
          onClick={handleSubmit(onPreSubmit)}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="submit"
        >
          {(session ? "Guardar " : "Crear ") + "Sesión"}
        </button>
      </div>
    </>
  );
}
export default SessionForm;
