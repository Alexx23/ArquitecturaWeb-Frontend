import { useEffect, useState } from "react";
import GenreAPI, { Genre, GenreCreate } from "../../api/GenreAPI";
import DataTable from "../../components/admin/DataTable";
import DeleteModal from "../../components/modals/DeleteModal";
import GenreCell from "../../components/admin/genres/GenreCell";
import GenreForm from "../../components/admin/genres/GenreForm";
import UpdateModal from "../../components/admin/UpdateModal";
import useGenres from "../../hooks/useGenres";
import { publish } from "../../utils/CustomEvents";

function GenresPage() {
  const [inputName, setInputName] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [updateGenre, setUpdateGenre] = useState<Genre | false | null>(null);
  const {
    genres,
    nextPage,
    actualPage,
    pageSize,
    totalSize,
    isLoading,
    setInputChanged,
    fetchNext,
    fetchCurrent,
    fetchPrevious,
  } = useGenres(inputName);

  const handleDelete = () => {
    GenreAPI.deleteGenre(deleteId!)
      .then(() => {
        publish("showSuccessMessage", "Has eliminado el género correctamente");
        fetchCurrent();
      })
      .catch((message) => {
        publish("showApiErrorMessage", message);
      })
      .finally(() => {
        setDeleteId(null);
      });
  };

  const handleUpdate = (genre: GenreCreate) => {
    let promise: Promise<Genre>;
    if (updateGenre) {
      promise = GenreAPI.updateGenre(updateGenre.id, genre);
    } else {
      promise = GenreAPI.createGenre(genre);
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
        setUpdateGenre(null);
      });
  };

  useEffect(() => {
    fetchNext();
  }, []);

  return (
    <>
      <DataTable
        data={genres}
        parentTitle={"Cartelera"}
        title={"Géneros"}
        columns={["Nombre"]}
        actualPage={actualPage}
        pageSize={pageSize}
        totalSize={totalSize}
        nextPage={nextPage}
        isLoading={isLoading}
        canEdit={true}
        canSearch={true}
        renderCell={(genre: Genre) => <GenreCell genre={genre} />}
        onNextPage={fetchNext}
        onPreviousPage={fetchPrevious}
        onSearch={(search: string) => {
          setInputChanged(true);
          setInputName(search);
        }}
        onDelete={setDeleteId}
        onCreate={() => setUpdateGenre(false)}
        onUpdate={setUpdateGenre}
      />
      <DeleteModal
        show={deleteId != null}
        onClose={() => setDeleteId(null)}
        onDelete={handleDelete}
      />
      <UpdateModal
        show={updateGenre != null}
        title="Género"
        element={updateGenre}
        onClose={() => setUpdateGenre(null)}
        renderForm={(genre: Genre | false | null) => (
          <GenreForm genre={genre} onSubmit={handleUpdate} />
        )}
      />
    </>
  );
}

export default GenresPage;
