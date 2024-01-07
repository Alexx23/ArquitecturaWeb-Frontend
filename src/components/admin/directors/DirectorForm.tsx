import { useForm } from "react-hook-form";
import { Director, DirectorCreate } from "../../../api/DirectorAPI";

interface Props {
  director: Director | false | null;
  onSubmit: (director: DirectorCreate) => void;
}

function DirectorForm({ director, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DirectorCreate>(
    director
      ? {
          defaultValues: {
            name: director.name,
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
        </div>
      </div>
      <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
        <button
          onClick={handleSubmit(onSubmit)}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="submit"
        >
          {(director ? "Guardar " : "Crear ") + "Director"}
        </button>
      </div>
    </>
  );
}
export default DirectorForm;
