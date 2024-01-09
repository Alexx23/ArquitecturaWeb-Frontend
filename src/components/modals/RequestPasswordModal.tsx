import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import RequestPasswordAPI, {
  RequestPasswordRequest,
} from "../../api/RequestPasswordAPI";
import { publish } from "../../utils/CustomEvents";

interface Props<T> {
  show: boolean;
  onClose: () => void;
}
function RequestPasswordModal<T>({ show, onClose }: Props<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestPasswordRequest>();

  const onSubmit = (data: RequestPasswordRequest) => {
    RequestPasswordAPI.requestPassword(data)
      .then(() => {
        publish(
          "showSuccessMessage",
          "Se ha enviado un mensaje a tu email. Revisa tu bandeja de entrada, podría estar en la carpeta de spam"
        );
      })
      .catch((err) => {
        publish("showApiErrorMessage", err);
      });
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="items-center justify-center w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                  <h3 className="text-xl font-semibold dark:text-white">
                    Recuperar contraseña
                  </h3>
                  <button
                    onClick={onClose}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Dirección de correo electrónico
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                        {...register("email", {
                          required: "Dirección de correo electrónico necesaria",
                          minLength: {
                            value: 1,
                            message:
                              "Dirección de correo electrónico necesaria",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="pt-2 text-red-500 text-base italic">
                          {errors.email.message + ""}
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
                    Enviar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default RequestPasswordModal;
