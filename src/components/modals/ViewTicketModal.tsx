import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import QRCode from "react-qr-code";
import { Ticket } from "../../api/TicketAPI";
import Loading from "../Loading";

interface Props {
  show: boolean;
  onClose: () => void;
  ticket: Ticket | null;
}

const ViewTicketModal = ({ show, onClose, ticket }: Props) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                {!ticket ? (
                  <div className="inline flex justify-center my-12">
                    <Loading color="fill-teal-400" size="h-7" />
                    <span className="ml-2 text-lg">Cargando ticket...</span>
                  </div>
                ) : (
                  <>
                    <div className="w-full">
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={ticket.code}
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                    <div className="my-10">
                      <p className="text-lg text-gray-600 text-center">
                        {"Sala: "}
                        <span className="font-semibold text-gray-900">
                          {ticket.session.room.name}
                        </span>
                      </p>
                      <p className="text-lg text-gray-600 text-center">
                        {"Fila: "}
                        <span className="font-semibold text-gray-900">
                          {Number(1 + ticket.depth)}
                        </span>
                      </p>
                      <p className="text-lg text-gray-600 text-center">
                        {"Asiento: "}
                        <span className="font-semibold text-gray-900">
                          {Number(1 + ticket.seat)}
                        </span>
                      </p>
                    </div>
                  </>
                )}

                <div className="items-center mt-4 text-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
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
export default ViewTicketModal;
