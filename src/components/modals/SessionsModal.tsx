import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo } from "react";
import { Movie } from "../../api/MovieAPI";
import { useState } from "react";
import useSessions from "../../hooks/useSessions";
import Loading from "../Loading";
import { formatHour, formatHumanDay, truncDay } from "../../utils/DateUtils";
import SessionRoomModal from "./SessionRoomModal";
import { Session } from "../../api/SessionAPI";
import { Price } from "../../api/PriceAPI";

interface Props {
  show: boolean;
  onClose: () => void;
  onOpen: () => void;
  movie: Movie;
  prices: Price[];
}
function SessionsModal({ show, onClose, onOpen, movie, prices }: Props) {
  const [datesByDay, setDatesByDay] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const { sessions, isLoading, fetch } = useSessions(movie.id);

  const getDatesByDay = (fechas: Date[]): string[] => {
    // Utilizar un Set para mantener fechas únicas
    const fechasUnicas: string[] = [];

    // Filtrar fechas duplicadas
    fechas.map((fecha) => {
      const fechaString = truncDay(fecha); // Obtener la representación de la fecha sin la parte de la hora
      if (!fechasUnicas.includes(fechaString)) {
        fechasUnicas.push(fechaString);
      }
    });

    return fechasUnicas;
  };

  const filteredSessions = useMemo(() => {
    if (!selectedDate) return [];
    return sessions.filter(
      (session) => truncDay(new Date(session.datetime)) == selectedDate
    );
  }, [sessions, selectedDate]);

  const handleSelectSession = (session: Session) => {
    setSelectedSession(session);
    onClose();
  };

  const handleCloseSelectSession = () => {
    setSelectedSession(null);
    onOpen();
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    setDatesByDay(
      getDatesByDay(sessions.map((session) => new Date(session.datetime)))
    );
  }, [sessions]);

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
                      Seleccionar una sesión
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
                  {isLoading ? (
                    <div className="inline flex justify-center my-12">
                      <Loading color="fill-teal-400" size="h-7" />
                      <span className="ml-2 text-lg">Cargando sesiones...</span>
                    </div>
                  ) : (
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-3">
                          <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                            Día de la sesión
                          </label>
                          <select
                            onChange={(event) =>
                              setSelectedDate(event.target.value)
                            }
                            value={selectedDate ?? undefined}
                            className="text-left shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          >
                            <option value={"Seleccionar un día"}>
                              Selecciona el día que desees
                            </option>
                            {datesByDay.map((date, index) => (
                              <option key={index} value={date}>
                                {formatHumanDay(new Date(date))}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {filteredSessions.length > 0 && (
                        <label
                          style={{ marginBottom: "-12px" }}
                          className="block text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Horas disponibles
                        </label>
                      )}
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 sm:gap-6">
                        {filteredSessions.map((session) => (
                          <div className="col-span-1" key={session.id}>
                            <button
                              onClick={() => handleSelectSession(session)}
                              className="text-white flex w-auto bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                              type="submit"
                            >
                              {formatHour(new Date(session.datetime))}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <SessionRoomModal
        show={selectedSession != null}
        onClose={handleCloseSelectSession}
        onCloseAll={() => {
          setSelectedSession(null);
          onClose();
        }}
        sessionId={selectedSession?.id ?? null}
        sessionDate={selectedSession?.datetime ?? null}
        prices={prices}
      />
    </>
  );
}

export default SessionsModal;
