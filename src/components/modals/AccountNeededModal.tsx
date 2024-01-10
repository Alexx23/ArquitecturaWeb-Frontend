import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

interface Props {
  show: boolean;
  onClose: () => void;
  content: string;
  redirectUrl: string;
}
function AccountNeededModal({ show, onClose, content, redirectUrl }: Props) {
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
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="items-center justify-center w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                <div className="text-lg leading-6 text-center">
                  <FontAwesomeIcon
                    icon={"info-circle"}
                    className="w-20 h-20 mx-auto text-blue-600"
                  />
                </div>
                <div className="mt-2">
                  <p className="text-lg text-gray-600 text-center mb-10 dark:text-gray-400">
                    {content}
                  </p>
                </div>

                <div className="items-center mt-4 text-center">
                  <Link
                    to={"/login?redirect=" + redirectUrl}
                    className="cursor-pointer text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-blue-800"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to={"/register?redirect=" + redirectUrl}
                    className="cursor-pointer text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    data-modal-hide="delete-user-modal"
                  >
                    Crear cuenta
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default AccountNeededModal;
