import { useForm } from "react-hook-form";
import { CardCreate } from "../../api/CardAPI";

interface LocalCardCreate extends CardCreate {
  month: number;
  year: number;
}

interface Props {
  onSubmit: (card: CardCreate) => void;
}

function CardForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocalCardCreate>();

  const onPreSubmit = (data: LocalCardCreate) => {
    const date = new Date();
    const payload: CardCreate = {
      ...data,
      expiration: new Date(
        Number("20" + data.year.toString()),
        data.month - 1,
        date.getDate()
      ).toISOString(),
    };

    onSubmit(payload);
  };

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Titular de la tarjeta
            </label>
            <input
              type="text"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              {...register("title", {
                required: "Titular necesario",
                minLength: {
                  value: 1,
                  message: "Titular necesario",
                },
              })}
            />
            {errors.title && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.title.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Número de tarjeta
            </label>
            <input
              type="number"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              {...register("card_number", {
                required: "Número de tarjeta necesaria",
                minLength: {
                  value: 16,
                  message: "El número de tarjeta debe tener 16 dígitos",
                },
                maxLength: {
                  value: 16,
                  message: "El número de tarjeta debe tener 16 dígitos",
                },
              })}
            />
            {errors.card_number && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.card_number.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-6 sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Cvv
            </label>
            <input
              type="number"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              {...register("cvv", {
                required: "Código de seguridad necesario",
                min: {
                  value: 0,
                  message: "Código de seguridad necesario",
                },
              })}
            />
            {errors.cvv && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.cvv.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-3 sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Mes de expiración
            </label>
            <input
              type="number"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              {...register("month", {
                required: "Mes necesario",
                min: {
                  value: 1,
                  message: "Mes debe ser mayor o igual a 1",
                },
                max: {
                  value: 12,
                  message: "Mes debe ser menor o igual a 12",
                },
              })}
            />
            {errors.month && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.month.message + ""}
              </p>
            )}
          </div>
          <div className="col-span-3 sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Año de expiración
            </label>
            <input
              type="number"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              {...register("year", {
                required: "Año necesario",
                min: {
                  value: 0,
                  message: "Año debe ser mayor o igual a 0 (Formato: AA)",
                },
                max: {
                  value: 99,
                  message: "Año debe ser menor o igual a 99 (Formato: AA)",
                },
              })}
            />
            {errors.year && (
              <p className="pt-2 text-red-500 text-base italic">
                {errors.year.message + ""}
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
          {"Añadir Tarjeta"}
        </button>
      </div>
    </>
  );
}
export default CardForm;
