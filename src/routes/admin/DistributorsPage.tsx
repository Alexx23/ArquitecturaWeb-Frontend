import { useEffect, useState } from "react";
import DistributorAPI, {
  Distributor,
  DistributorCreate,
} from "../../api/DistributorAPI";
import DataTable from "../../components/admin/DataTable";
import DeleteModal from "../../components/modals/DeleteModal";
import DistributorCell from "../../components/admin/distributors/DistributorCell";
import DistributorForm from "../../components/admin/distributors/DistributorForm";
import UpdateModal from "../../components/admin/UpdateModal";
import useDistributors from "../../hooks/useDistributors";
import { publish } from "../../utils/CustomEvents";

function DistributorsPage() {
  const [inputName, setInputName] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [updateDistributor, setUpdateDistributor] = useState<
    Distributor | false | null
  >(null);
  const {
    distributors,
    nextPage,
    actualPage,
    pageSize,
    totalSize,
    isLoading,
    setInputChanged,
    fetchNext,
    fetchCurrent,
    fetchPrevious,
  } = useDistributors(inputName);

  const handleDelete = () => {
    DistributorAPI.deleteDistributor(deleteId!)
      .then(() => {
        publish(
          "showSuccessMessage",
          "Has eliminado el distribuidor correctamente"
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

  const handleUpdate = (distributor: DistributorCreate) => {
    let promise: Promise<Distributor>;
    if (updateDistributor) {
      promise = DistributorAPI.updateDistributor(
        updateDistributor.id,
        distributor
      );
    } else {
      promise = DistributorAPI.createDistributor(distributor);
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
        setUpdateDistributor(null);
      });
  };

  useEffect(() => {
    fetchNext();
  }, []);

  return (
    <>
      <DataTable
        data={distributors}
        parentTitle={"Cartelera"}
        title={"Distribuidores"}
        columns={["Nombre"]}
        actualPage={actualPage}
        pageSize={pageSize}
        totalSize={totalSize}
        nextPage={nextPage}
        isLoading={isLoading}
        canEdit={true}
        canSearch={true}
        renderCell={(distributor: Distributor) => (
          <DistributorCell distributor={distributor} />
        )}
        onNextPage={fetchNext}
        onPreviousPage={fetchPrevious}
        onSearch={(search: string) => {
          setInputChanged(true);
          setInputName(search);
        }}
        onDelete={setDeleteId}
        onCreate={() => setUpdateDistributor(false)}
        onUpdate={setUpdateDistributor}
      />
      <DeleteModal
        show={deleteId != null}
        onClose={() => setDeleteId(null)}
        onDelete={handleDelete}
      />
      <UpdateModal
        show={updateDistributor != null}
        title="Distribuidor"
        element={updateDistributor}
        onClose={() => setUpdateDistributor(null)}
        renderForm={(distributor: Distributor | false | null) => (
          <DistributorForm distributor={distributor} onSubmit={handleUpdate} />
        )}
      />
    </>
  );
}

export default DistributorsPage;
