import { useEffect, useState } from "react";
import ActorAPI, { Actor, ActorCreate } from "../../api/ActorAPI";
import DataTable from "../../components/admin/DataTable";
import DeleteModal from "../../components/admin/DeleteModal";
import ActorCell from "../../components/admin/actors/ActorCell";
import ActorForm from "../../components/admin/actors/ActorForm";
import UpdateModal from "../../components/admin/UpdateModal";
import useActors from "../../hooks/useActors";
import { publish } from "../../utils/CustomEvents";

function ActorsPage() {
  const [inputName, setInputName] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [updateActor, setUpdateActor] = useState<Actor | false | null>(null);
  const {
    actors,
    nextPage,
    actualPage,
    pageSize,
    totalSize,
    isLoading,
    setInputChanged,
    fetchNext,
    fetchCurrent,
    fetchPrevious,
  } = useActors(inputName);

  const handleDelete = () => {
    ActorAPI.deleteActor(deleteId!)
      .then(() => {
        publish("showSuccessMessage", "Has eliminado el actor correctamente");
        fetchCurrent();
      })
      .catch((message) => {
        publish("showApiErrorMessage", message);
      })
      .finally(() => {
        setDeleteId(null);
      });
  };

  const handleUpdate = (actor: ActorCreate) => {
    let promise: Promise<Actor>;
    if (updateActor) {
      promise = ActorAPI.updateActor(updateActor.id, actor);
    } else {
      promise = ActorAPI.createActor(actor);
    }
    promise
      .then((res) => {
        publish("showSuccessMessage", "Operación realizada correctamente");
        fetchCurrent();
      })
      .catch((message) => {
        publish("showApiErrorMessage", message);
      })
      .finally(() => {
        setUpdateActor(null);
      });
  };

  useEffect(() => {
    fetchNext();
  }, []);

  return (
    <>
      <DataTable
        data={actors}
        parentTitle={"Cartelera"}
        title={"Actores"}
        columns={["Nombre", "Número de Películas"]}
        actualPage={actualPage}
        pageSize={pageSize}
        totalSize={totalSize}
        nextPage={nextPage}
        isLoading={isLoading}
        canEdit={true}
        canSearch={true}
        renderCell={(actor: Actor) => <ActorCell actor={actor} />}
        onNextPage={fetchNext}
        onPreviousPage={fetchPrevious}
        onSearch={(search: string) => {
          setInputChanged(true);
          setInputName(search);
        }}
        onDelete={setDeleteId}
        onCreate={() => setUpdateActor(false)}
        onUpdate={setUpdateActor}
      />
      <DeleteModal
        show={deleteId != null}
        onClose={() => setDeleteId(null)}
        onDelete={handleDelete}
      />
      <UpdateModal
        show={updateActor != null}
        title="Actor"
        element={updateActor}
        onClose={() => setUpdateActor(null)}
        renderForm={(actor: Actor | false | null) => (
          <ActorForm actor={actor} onSubmit={handleUpdate} />
        )}
      />
    </>
  );
}

export default ActorsPage;
