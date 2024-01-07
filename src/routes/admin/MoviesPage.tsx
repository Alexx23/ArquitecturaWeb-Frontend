import { useEffect, useState } from "react";
import MovieAPI, { Movie } from "../../api/MovieAPI";
import DataTable from "../../components/admin/DataTable";
import DeleteModal from "../../components/admin/DeleteModal";
import MovieCell from "../../components/admin/MovieCell";
import MovieForm from "../../components/admin/MovieForm";
import UpdateModal from "../../components/admin/UpdateModal";
import useMovies from "../../hooks/useMovies";
import { publish } from "../../utils/CustomEvents";

function MoviesPage() {
  const [inputName, setInputName] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [updateMovie, setUpdateMovie] = useState<Movie | false | null>(null);
  const {
    movies,
    nextPage,
    actualPage,
    pageSize,
    totalSize,
    isLoading,
    fetchNext,
    fetchCurrent,
    fetchPrevious,
  } = useMovies(inputName);

  const handleDelete = () => {
    MovieAPI.deleteMovie(deleteId!)
      .then(() => {
        publish(
          "showSuccessMessage",
          "Has eliminado la película correctamente"
        );
        fetchCurrent();
      })
      .catch(() => {
        publish("showApiErrorMessage", "No se ha podido eliminar la película");
      })
      .finally(() => {
        setDeleteId(null);
      });
  };

  useEffect(() => {
    fetchNext();
  }, []);

  return (
    <>
      <DataTable
        data={movies}
        parentTitle={"Cartelera"}
        title={"Películas"}
        columns={[
          "Nombre",
          "Año",
          "Duración (minutos)",
          "Web",
          "Género",
          "Nacionalidad",
          "Distribuidor",
          "Director",
          "Clasificación",
          "Acciones",
        ]}
        actualPage={actualPage}
        pageSize={pageSize}
        totalSize={totalSize}
        nextPage={nextPage}
        isLoading={isLoading}
        renderCell={(movie: Movie) => <MovieCell movie={movie} />}
        onNextPage={fetchNext}
        onPreviousPage={fetchPrevious}
        onSearch={(search: string) => {
          setInputName(search);
        }}
        onDelete={setDeleteId}
        onCreate={() => setUpdateMovie(false)}
        onUpdate={setUpdateMovie}
      />
      <DeleteModal
        show={deleteId != null}
        onClose={() => setDeleteId(null)}
        onDelete={handleDelete}
      />
      <UpdateModal
        show={updateMovie != null}
        title="Película"
        element={updateMovie}
        onClose={() => setUpdateMovie(null)}
        renderForm={(movie: Movie | false | null) => (
          <MovieForm movie={movie} />
        )}
        onSubmit={() => {}}
      />
    </>
  );
}

export default MoviesPage;
