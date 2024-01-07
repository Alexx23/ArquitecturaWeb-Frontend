import { useForm } from "react-hook-form";
import { Movie } from "../../api/MovieAPI";

interface Props {
  movie: Movie | false | null;
}

function MovieForm({ movie }: Props) {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Movie>();

  const movieName = movie ? movie.name : "";
  return (
    <>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre
          </label>
          <input
            type="text"
            value={movieName}
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
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          <input
            type="text"
            value="Green"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Green"
            required
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            value="bonnie@flowbite.com"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="example@company.com"
            required
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Position
          </label>
          <input
            type="text"
            value="React Developer"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="e.g. React developer"
            required
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Current Password
          </label>
          <input
            type="password"
            value="••••••••"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <input
            type="password"
            value="••••••••"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="col-span-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Biography
          </label>
          <textarea
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="👨‍💻Full-stack web developer. Open-source contributor."
          >
            👨‍💻Full-stack web developer. Open-source contributor.
          </textarea>
        </div>
      </div>
    </>
  );
}
export default MovieForm;
