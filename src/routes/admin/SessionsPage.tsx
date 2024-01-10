import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SessionAPI, { Session, SessionCreate } from "../../api/SessionAPI";
import DataTable from "../../components/admin/DataTable";
import SessionCell from "../../components/admin/sessions/SessionCell";
import SessionForm from "../../components/admin/sessions/SessionForm";
import DeleteModal from "../../components/modals/DeleteModal";
import UpdateModal from "../../components/modals/UpdateModal";
import useSessions from "../../hooks/useSessions";
import { publish } from "../../utils/CustomEvents";

function SessionsPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [updateSession, setUpdateSession] = useState<Session | false | null>(
    null
  );
  const { sessions, isLoading, fetch } = useSessions(date);

  const handleDelete = () => {
    SessionAPI.deleteSession(deleteId!)
      .then(() => {
        publish("showSuccessMessage", "Has eliminado la sesión correctamente");
        fetch();
      })
      .catch((message) => {
        publish("showApiErrorMessage", message);
      })
      .finally(() => {
        setDeleteId(null);
      });
  };

  const handleUpdate = (session: SessionCreate) => {
    let promise: Promise<Session>;
    if (updateSession) {
      promise = SessionAPI.updateSession(updateSession.id, session);
    } else {
      promise = SessionAPI.createSession(session);
    }
    promise
      .then((res) => {
        publish("showSuccessMessage", "Operación realizada correctamente");
        fetch();
      })
      .catch((message) => {
        publish("showApiErrorMessage", message);
      })
      .finally(() => {
        setUpdateSession(null);
      });
  };

  useEffect(() => {
    fetch();
  }, [date]);

  return (
    <>
      <DataTable
        data={sessions}
        title={"Sesiones"}
        columns={["Hora", "Película", "Butacas ocupadas", "Aforo"]}
        actualPage={1}
        pageSize={sessions.length}
        totalSize={sessions.length}
        nextPage={-1}
        isLoading={isLoading}
        canEdit={true}
        canSearch={true}
        customSearch={() => (
          <DatePicker
            locale={"es"}
            selected={date}
            onChange={(date) => {
              if (date) setDate(date);
            }}
          />
        )}
        renderCell={(session: Session) => <SessionCell session={session} />}
        onNextPage={() => {}}
        onPreviousPage={() => {}}
        onSearch={() => {}}
        onDelete={setDeleteId}
        onCreate={() => setUpdateSession(false)}
        onUpdate={setUpdateSession}
      />

      <DeleteModal
        show={deleteId != null}
        onClose={() => setDeleteId(null)}
        onDelete={handleDelete}
      />
      <UpdateModal
        show={updateSession != null}
        title="Sesión"
        element={updateSession}
        onClose={() => setUpdateSession(null)}
        renderForm={(session: Session | false | null) => (
          <SessionForm
            session={session}
            onSubmit={handleUpdate}
            selectedDate={date}
          />
        )}
      />
    </>
  );
}

export default SessionsPage;
