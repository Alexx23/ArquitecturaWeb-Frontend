import { useForm } from "react-hook-form";
import { Movie, MovieCreate } from "../../../api/MovieAPI";
import useGenres from "../../../hooks/useGenres";
import { useEffect, useState } from "react";
import useDirectors from "../../../hooks/useDirectors";
import useDistributors from "../../../hooks/useDistributors";
import useNationalities from "../../../hooks/useNationalities";
import useAgeClassifications from "../../../hooks/useAgeClassification";

interface Props {
  movie: Movie | false | null;
  onSubmit: (movie: MovieCreate) => void;
}

function MovieForm({ movie, onSubmit }: Props) {
  const { genres, fetchAll: fetchAllGenres } = useGenres("");
  const { directors, fetchAll: fetchAllDirectors } = useDirectors("");
  const { distributors, fetchAll: fetchAllDistributos } = useDistributors("");
  const { nationalities, fetchAll: fetchAllNationalities } =
    useNationalities("");
  const { ageClassifications, fetchAll: fetchAllAgesClassifications } =
    useAgeClassifications();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MovieCreate>(
    movie
      ? {
          defaultValues: {
            name: movie.name,
            original_title: movie.original_title,
            year: movie.year,
            duration: movie.duration,
            web: movie.web,
            synopsis: movie.synopsis,
            genre_id: movie.genre.id,
            nationality_id: movie.nationality.id,
            distributor_id: movie.distributor.id,
            director_id: movie.director.id,
            age_classification_id: movie.age_classification.id,
          },
        }
      : {}
  );

  useEffect(() => {
    if (
      !movie ||
      !genres.length ||
      !directors.length ||
      !distributors.length ||
      !nationalities.length ||
      !ageClassifications.length
    )
      return;
    setValue("genre_id", movie.genre.id);
    setValue("nationality_id", movie.nationality.id);
    setValue("distributor_id", movie.distributor.id);
    setValue("director_id", movie.director.id);
    setValue("age_classification_id", movie.age_classification.id);
  }, [
    movie,
    genres,
    directors,
    distributors,
    nationalities,
    ageClassifications,
  ]);

  useEffect(() => {
    fetchAllGenres();
    fetchAllDirectors();
    fetchAllDistributos();
    fetchAllNationalities();
    fetchAllAgesClassifications();
  }, []);

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
          <div className="col-span-6 sm:col-span-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Título original
            </label>
            <input
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              {...register("original_title", {
                required: "Nombre necesario",
                minLength: {
                  value: 1,
                  message: "Nombre necesario",
                },
              })}
            />
            {errors.original_title && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.original_title.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Año
            </label>
            <input
              type="number"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              {...register("year", {
                required: "Año necesario",
                min: {
                  value: 1,
                  message: "Año necesario",
                },
              })}
            />
            {errors.year && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.year.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Duración
            </label>
            <input
              type="number"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              {...register("duration", {
                required: "Duración necesaria",
                min: {
                  value: 1,
                  message: "Duración necesaria",
                },
              })}
            />
            {errors.duration && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.duration.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Web
            </label>
            <input
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              {...register("web", {
                required: "Web necesaria",
                minLength: {
                  value: 1,
                  message: "Web necesaria",
                },
              })}
            />
            {errors.web && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.web.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Género
            </label>
            <select
              className="text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              {...register("genre_id", {
                required: "Género necesario",
              })}
            >
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            {errors.genre_id && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.genre_id.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nacionalidad
            </label>
            <select
              className="text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              {...register("nationality_id", {
                required: "Nacionalidad necesaria",
              })}
            >
              {nationalities.map((nationality) => (
                <option key={nationality.id} value={nationality.id}>
                  {nationality.name}
                </option>
              ))}
            </select>
            {errors.nationality_id && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.nationality_id.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Distribuidor
            </label>
            <select
              className="text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              {...register("distributor_id", {
                required: "Distribuidor necesario",
              })}
            >
              {distributors.map((distributor) => (
                <option key={distributor.id} value={distributor.id}>
                  {distributor.name}
                </option>
              ))}
            </select>
            {errors.distributor_id && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.distributor_id.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Director
            </label>
            <select
              className="text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              {...register("director_id", {
                required: "Director necesario",
              })}
            >
              {directors.map((director) => (
                <option key={director.id} value={director.id}>
                  {director.name}
                </option>
              ))}
            </select>
            {errors.director_id && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.director_id.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Clasificación de edad
            </label>
            <select
              className="text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              {...register("age_classification_id", {
                required: "Clasificación de edad necesaria",
              })}
            >
              {ageClassifications.map((ageClassification) => (
                <option key={ageClassification.id} value={ageClassification.id}>
                  {ageClassification.name}
                </option>
              ))}
            </select>
            {errors.age_classification_id && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.age_classification_id.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sinopsis
            </label>
            <textarea
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              {...register("synopsis")}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
        <button
          onClick={handleSubmit(onSubmit)}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="submit"
        >
          {(movie ? "Guardar " : "Crear ") + "Película"}
        </button>
      </div>
    </>
  );
}
export default MovieForm;
