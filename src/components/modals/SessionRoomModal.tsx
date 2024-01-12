import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import Tooltip from "@mui/material/Tooltip";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { BuyObject } from "../../api/PaymentAPI";
import { Price } from "../../api/PriceAPI";
import SessionAPI, { Session } from "../../api/SessionAPI";
import { TicketSeat } from "../../api/TicketAPI";
import { useUser } from "../../context/UserContext";
import { publish } from "../../utils/CustomEvents";
import { formatHour, formatHumanDay } from "../../utils/DateUtils";
import Loading from "../Loading";
import AccountNeededModal from "./AccountNeededModal";

interface Props {
  show: boolean;
  onClose: () => void;
  onCloseAll: () => void;
  sessionId: number | null;
  sessionDate: Date | null;
  prices: Price[];
}
function SessionRoomModal({
  show,
  onClose,
  onCloseAll,
  sessionId,
  sessionDate,
  prices,
}: Props) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [showAccountNeededModal, setShowAccountNeededModal] = useState(false);
  const [buyUrl, setBuyUrl] = useState("");

  const { pathname } = useLocation();

  const { user } = useUser();

  const handleSeatSelection = (depth: number, seat: number) => {
    const seatString = depth + ":" + seat;
    if (selectedSeats.includes(seatString)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatString));
    } else {
      setSelectedSeats([...selectedSeats, seatString]);
    }
  };

  const printSeats = useMemo(() => {
    return selectedSeats.map((s) => (
      <span key={s} className="text-lg font-medium dark:text-white">
        {" "}
        {"(" +
          Number(Number(s.split(":")[0]) + 1) +
          ":" +
          Number(Number(s.split(":")[1]) + 1) +
          ")"}{" "}
      </span>
    ));
  }, [selectedSeats]);

  const isOccupied = (depth: number, seat: number) => {
    return occupiedSeats.includes(depth + ":" + seat);
  };

  const loadSession = () => {
    if (!sessionId) return;
    SessionAPI.getSession(sessionId)
      .then((session) => {
        setSession(session);
      })
      .catch((error) => {
        publish(
          "showApiErrorMessage",
          "No se ha podido cargar la sesión correctamente. Inténtalo de nuevo en unos minutos"
        );
      });
  };

  const handleBuy = () => {
    if (!session) return;
    if (selectedSeats.length === 0) return;

    const seats: TicketSeat[] = [];
    selectedSeats.map((seat) => {
      seats.push({
        depth: Number(seat.split(":")[0]),
        seat: Number(seat.split(":")[1]),
      });
    });

    const buyObject: BuyObject = {
      session_id: session.id,
      seats: seats,
    };

    const json = JSON.stringify(buyObject);

    const url = pathname + "?buy=" + btoa(json);

    if (user) {
      window.location.href = url;
    } else {
      setBuyUrl(url);
      setShowAccountNeededModal(true);
      onClose();
      onCloseAll();
    }
  };

  useEffect(() => {
    setSelectedSeats([]);
    setOccupiedSeats([]);
    loadSession();
  }, [sessionId]);

  useEffect(() => {
    if (!session) return;
    session.ticket_list.map((ticket) => {
      setOccupiedSeats((occupiedSeats) => [
        ...occupiedSeats,
        ticket.depth + ":" + ticket.seat,
      ]);
    });
  }, [session]);

  return (
    <>
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
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="items-center justify-center w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                  <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                    <h3 className="text-xl font-semibold dark:text-white">
                      Sesión:
                    </h3>
                    {sessionDate && (
                      <h3 className="ml-2 text-xl font-semibold dark:text-white">
                        {formatHumanDay(new Date(sessionDate)) +
                          " " +
                          formatHour(new Date(sessionDate))}
                      </h3>
                    )}
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
                  <div className="mx-6 p-5 border-b rounded-t dark:border-gray-700">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold dark:text-white">
                        Butacas seleccionadas:
                        {selectedSeats.length === 0 && (
                          <span className="text-base font-medium dark:text-white">
                            {" " + "No has seleccionado ninguna butaca"}
                          </span>
                        )}
                        {printSeats}
                      </h3>
                      <button
                        onClick={handleBuy}
                        className="max-w-[15rem] text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        <FontAwesomeIcon
                          icon="cart-shopping"
                          className="mr-2"
                        />
                        Comprar
                      </button>
                    </div>
                    {prices.length > 0 && (
                      <div className="flex items-start justify-between mt-1">
                        <span>
                          Precio por butaca:{" "}
                          {Number(prices[0].amount).toFixed(2) + "€"}
                        </span>
                        <span className="font-semibold mx-3">
                          Precio total:{" "}
                          {Number(
                            prices[0].amount * selectedSeats.length
                          ).toFixed(2) + "€"}
                        </span>
                      </div>
                    )}
                  </div>

                  {!session ? (
                    <div className="inline flex justify-center my-12">
                      <Loading color="fill-teal-400" size="h-7" />
                      <span className="ml-2 text-lg">Cargando butacas...</span>
                    </div>
                  ) : (
                    <>
                      <div className="p-6 space-y-6">
                        <div className="text-center">
                          <span className="text-base font-semibold text-gray-900 dark:text-gray-50">
                            PANTALLA
                          </span>
                        </div>
                        <div className="text-center">
                          {Array.from(
                            { length: session.room.depth },
                            (_, depth) => (
                              <div key={depth}>
                                {Array.from(
                                  { length: session.room.seats },
                                  (_, seat) => (
                                    <Tooltip
                                      key={depth + ":" + seat}
                                      title={
                                        "Fila: " +
                                        Number(1 + depth) +
                                        ", \nButaca: " +
                                        Number(1 + seat) +
                                        (isOccupied(depth, seat)
                                          ? ".\nOCUPADA"
                                          : "")
                                      }
                                      arrow
                                      placement="top"
                                    >
                                      <div className="relative inline-block">
                                        <input
                                          disabled={isOccupied(depth, seat)}
                                          onClick={() =>
                                            handleSeatSelection(depth, seat)
                                          }
                                          type="checkbox"
                                          value={depth + ":" + seat}
                                          className={
                                            "mx-0.5 xl:mx-1 my-1.5 w-4 h-4 text-blue-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2" +
                                            (isOccupied(depth, seat)
                                              ? " bg-red-300 border-red-500 dark:bg-red-700 dark:border-red-600"
                                              : " bg-green-300 border-green-500 dark:bg-green-700 dark:border-green-600")
                                          }
                                        />
                                        {isOccupied(depth, seat) && (
                                          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                            <span className="text-red-500 text-xl font-bold">
                                              X
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </Tooltip>
                                  )
                                )}
                                <br key={depth} />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <AccountNeededModal
        show={showAccountNeededModal}
        onClose={() => setShowAccountNeededModal(false)}
        content={
          "¡Crea una cuenta! Necesitas tener una cuenta para comprar una entrada. Al iniciar sesión o al registrarte, podrás continuar con esta compra."
        }
        redirectUrl={buyUrl}
      />
    </>
  );
}

export default SessionRoomModal;
