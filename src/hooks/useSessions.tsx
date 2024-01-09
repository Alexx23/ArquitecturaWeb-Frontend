import { useEffect, useState } from "react";
import SessionAPI, { Session } from "../api/SessionAPI";
import { publish } from "../utils/CustomEvents";

function useSessions(date: Date, movieId?: number) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const requestSessions = () => {
    if (isLoading) return;
    setIsLoading(true);

    SessionAPI.getSessions(date, movieId ? movieId : null)
      .then((res) => {
        setSessions(res);
      })
      .catch((err) => {
        publish(
          "showApiErrorMessage",
          "No se ha podido cargar la lista de sesiones correctamente. Por favor, inténtalo de nuevo en unos minutos."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    sessions,
    isLoading,
    fetch: () => requestSessions(),
  };
}

export default useSessions;
