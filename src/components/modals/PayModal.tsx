import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo } from "react";
import { Movie } from "../../api/MovieAPI";
import { useState } from "react";
import useSessions from "../../hooks/useSessions";
import Loading from "../Loading";
import {
  formatCardExpirationDate,
  formatHour,
  formatHumanDay,
  truncDay,
} from "../../utils/DateUtils";
import SessionRoomModal from "./SessionRoomModal";
import { Session } from "../../api/SessionAPI";
import { useUser } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateModal from "./UpdateModal";
import CardForm from "../client/CardForm";
import CardAPI, { Card, CardCreate } from "../../api/CardAPI";
import { publish } from "../../utils/CustomEvents";
import { useNavigate } from "react-router-dom";
import PaymentAPI, { BuyObject, PaymentCreate } from "../../api/PaymentAPI";

interface Props {
  show: boolean;
  onClose: () => void;
  onOpen: () => void;
  buyObject: BuyObject | null;
}
function PayModal({ show, onClose, onOpen, buyObject }: Props) {
  const [showCreateCard, setShowCreateCard] = useState(false);

  const { user } = useUser();
  const navigate = useNavigate();

  const handlePay = (card: Card) => {
    if (!buyObject) return;
    const paymentCreate: PaymentCreate = {
      ...buyObject,
      card_id: card.id,
    };

    PaymentAPI.createPayment(paymentCreate)
      .then((res) => {
        publish("showSuccessMessage", "Tickets comprados correctamente");
      })
      .catch((err) => {
        publish("showApiErrorMessage", err);
      });
  };

  const handleCreateCard = (data: CardCreate) => {
    CardAPI.createCard(data)
      .then((res) => {
        publish("showSuccessMessage", "Tarjeta añadida correctamente");
        navigate(0); // Actualizar página
      })
      .catch((err) => {
        publish("showApiErrorMessage", err);
      });
  };

  const handleAddCard = () => {
    setShowCreateCard(true);
    onClose();
  };

  const onCloseAddCard = () => {
    setShowCreateCard(false);
    onOpen();
  };

  return (
    <>
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
                <Dialog.Panel className="items-center justify-center w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                  <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                    <h3 className="text-xl font-semibold dark:text-white">
                      Selecciona una tarjeta
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
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {user?.card_list.map((card) => (
                        <li key={card.id} className="py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <FontAwesomeIcon
                                icon="credit-card"
                                className="w-8 h-8"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="block text-base font-semibold text-gray-900 truncate dark:text-white">
                                {card.title}
                              </span>
                              <span className="block text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                                **** **** **** ****{" ("}
                                {formatCardExpirationDate(
                                  new Date(card.expiration)
                                )}
                                {")"}
                              </span>
                            </div>
                            <div className="inline-flex items-center">
                              <button
                                onClick={() => handlePay(card)}
                                className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                              >
                                Seleccionar
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <button
                        onClick={handleAddCard}
                        className="mt-2 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        <FontAwesomeIcon icon="plus" className="mr-2 w-4 h-4" />
                        Añadir tarjeta
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <UpdateModal
        show={showCreateCard}
        title="Tarjeta"
        element={undefined}
        onClose={onCloseAddCard}
        renderForm={() => <CardForm onSubmit={handleCreateCard} />}
      />
    </>
  );
}

export default PayModal;
