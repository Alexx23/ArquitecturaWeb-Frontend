import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { subscribe, unsubscribe } from "../../utils/CustomEvents";

interface Props {
  goTo?: string;
}

const ApiErrorModal = ({ goTo }: Props) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  function closeModal() {
    if (goTo == null) {
      setIsOpen(false);
    } else {
      navigate(goTo);
    }
  }

  useEffect(() => {
    subscribe("showApiErrorMessage", (data: any) => {
      setIsOpen(true);
      setMessage(data.detail);
    });

    return () => {
      unsubscribe("showApiErrorMessage", () => setIsOpen(false));
    };
  }, []);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={closeModal}>
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
              <Dialog.Panel className="items-center justify-center w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="text-lg leading-6 text-center">
                  <FontAwesomeIcon
                    icon="circle-xmark"
                    className="text-red-600 mb-4"
                    size="4x"
                  />
                </div>
                <div className="mt-2">
                  <p className="text-lg text-gray-600 text-center">{message}</p>
                </div>

                <div className="items-center mt-4 text-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default ApiErrorModal;
