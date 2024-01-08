import { useEffect, useState } from "react";
import DirectorAPI, { Director, DirectorCreate } from "../../api/DirectorAPI";
import DataTable from "../../components/admin/DataTable";
import DeleteModal from "../../components/modals/DeleteModal";
import DirectorCell from "../../components/admin/directors/DirectorCell";
import DirectorForm from "../../components/admin/directors/DirectorForm";
import UpdateModal from "../../components/admin/UpdateModal";
import useDirectors from "../../hooks/useDirectors";
import { publish } from "../../utils/CustomEvents";

function DirectorsPage() {
  const [inputName, setInputName] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [updateDirector, setUpdateDirector] = useState<Director | false | null>(
    null
  );
  const {
    directors,
    nextPage,
    actualPage,
    pageSize,
    totalSize,
    isLoading,
    setInputChanged,
    fetchNext,
    fetchCurrent,
    fetchPrevious,
  } = useDirectors(inputName);

  const handleDelete = () => {
    DirectorAPI.deleteDirector(deleteId!)
      .then(() => {
        publish(
          "showSuccessMessage",
          "Has eliminado el director correctamente"
        );
        fetchCurrent();
      })
      .catch((message) => {
        publish("showApiErrorMessage", message);
      })
      .finally(() => {
        setDeleteId(null);
      });
  };

  const handleUpdate = (director: DirectorCreate) => {
    let promise: Promise<Director>;
    if (updateDirector) {
      promise = DirectorAPI.updateDirector(updateDirector.id, director);
    } else {
      promise = DirectorAPI.createDirector(director);
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
        setUpdateDirector(null);
      });
  };

  useEffect(() => {
    fetchNext();
  }, []);

  return (
    <>
      <DataTable
        data={directors}
        parentTitle={"Cartelera"}
        title={"Directores"}
        columns={["Nombre"]}
        actualPage={actualPage}
        pageSize={pageSize}
        totalSize={totalSize}
        nextPage={nextPage}
        isLoading={isLoading}
        canEdit={true}
        canSearch={true}
        renderCell={(director: Director) => (
          <DirectorCell director={director} />
        )}
        onNextPage={fetchNext}
        onPreviousPage={fetchPrevious}
        onSearch={(search: string) => {
          setInputChanged(true);
          setInputName(search);
        }}
        onDelete={setDeleteId}
        onCreate={() => setUpdateDirector(false)}
        onUpdate={setUpdateDirector}
      />
      <DeleteModal
        show={deleteId != null}
        onClose={() => setDeleteId(null)}
        onDelete={handleDelete}
      />
      <UpdateModal
        show={updateDirector != null}
        title="Director"
        element={updateDirector}
        onClose={() => setUpdateDirector(null)}
        renderForm={(director: Director | false | null) => (
          <DirectorForm director={director} onSubmit={handleUpdate} />
        )}
      />
    </>
  );
}

export default DirectorsPage;
