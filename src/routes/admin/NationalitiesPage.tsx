import { useEffect, useState } from "react";
import NationalityAPI, {
  Nationality,
  NationalityCreate,
} from "../../api/NationalityAPI";
import DataTable from "../../components/admin/DataTable";
import DeleteModal from "../../components/admin/DeleteModal";
import NationalityCell from "../../components/admin/nationalities/NationalityCell";
import NationalityForm from "../../components/admin/nationalities/NationalityForm";
import UpdateModal from "../../components/admin/UpdateModal";
import useNationalities from "../../hooks/useNationalities";
import { publish } from "../../utils/CustomEvents";

function NationalitiesPage() {
  const [inputName, setInputName] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [updateNationality, setUpdateNationality] = useState<
    Nationality | false | null
  >(null);
  const {
    nationalities,
    nextPage,
    actualPage,
    pageSize,
    totalSize,
    isLoading,
    setInputChanged,
    fetchNext,
    fetchCurrent,
    fetchPrevious,
  } = useNationalities(inputName);

  const handleDelete = () => {
    NationalityAPI.deleteNationality(deleteId!)
      .then(() => {
        publish(
          "showSuccessMessage",
          "Has eliminado la nacionalidad correctamente"
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

  const handleUpdate = (nationality: NationalityCreate) => {
    let promise: Promise<Nationality>;
    if (updateNationality) {
      promise = NationalityAPI.updateNationality(
        updateNationality.id,
        nationality
      );
    } else {
      promise = NationalityAPI.createNationality(nationality);
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
        setUpdateNationality(null);
      });
  };

  useEffect(() => {
    fetchNext();
  }, []);

  return (
    <>
      <DataTable
        data={nationalities}
        parentTitle={"Cartelera"}
        title={"Nacionalidades"}
        columns={["Nombre"]}
        actualPage={actualPage}
        pageSize={pageSize}
        totalSize={totalSize}
        nextPage={nextPage}
        isLoading={isLoading}
        canEdit={true}
        canSearch={true}
        renderCell={(nationality: Nationality) => (
          <NationalityCell nationality={nationality} />
        )}
        onNextPage={fetchNext}
        onPreviousPage={fetchPrevious}
        onSearch={(search: string) => {
          setInputChanged(true);
          setInputName(search);
        }}
        onDelete={setDeleteId}
        onCreate={() => setUpdateNationality(false)}
        onUpdate={setUpdateNationality}
      />
      <DeleteModal
        show={deleteId != null}
        onClose={() => setDeleteId(null)}
        onDelete={handleDelete}
      />
      <UpdateModal
        show={updateNationality != null}
        title="Nacionalidad"
        element={updateNationality}
        onClose={() => setUpdateNationality(null)}
        renderForm={(nationality: Nationality | false | null) => (
          <NationalityForm nationality={nationality} onSubmit={handleUpdate} />
        )}
      />
    </>
  );
}

export default NationalitiesPage;
