import { useEffect, useState } from "react";
import MovieAPI, { Movie, MovieCreate } from "../../api/MovieAPI";
import DataTable from "../../components/admin/DataTable";
import DeleteModal from "../../components/modals/DeleteModal";
import MovieActorForm from "../../components/admin/movies/MovieActorsForm";
import MovieCell from "../../components/admin/movies/MovieCell";
import MovieForm from "../../components/admin/movies/MovieForm";
import UpdateModal from "../../components/admin/UpdateModal";
import useMovies from "../../hooks/useMovies";
import { publish } from "../../utils/CustomEvents";

function MoviesPage() {
  const [inputName, setInputName] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [updateMovie, setUpdateMovie] = useState<Movie | false | null>(null);
  const [updateMovieActors, setUpdateMovieActors] = useState<Movie | null>(
    null
  );
  const {
    movies,
    nextPage,
    actualPage,
    pageSize,
    totalSize,
    isLoading,
    setInputChanged,
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
      .catch((message) => {
        publish("showApiErrorMessage", message);
      })
      .finally(() => {
        setDeleteId(null);
      });
  };

  const handleUpdate = (movie: MovieCreate) => {
    let promise: Promise<Movie>;
    if (updateMovie) {
      promise = MovieAPI.updateMovie(updateMovie.id, movie);
    } else {
      promise = MovieAPI.createMovie(movie);
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
        setUpdateMovie(null);
      });
  };

  const handleUpdateActorIds = (actorIds: number[]) => {
    MovieAPI.setActors(updateMovieActors!.id, actorIds)
      .then((res) => {
        publish("showSuccessMessage", "Operación realizada correctamente");
        fetchCurrent();
      })
      .catch((message) => {
        publish("showApiErrorMessage", message);
      })
      .finally(() => {
        setUpdateMovieActors(null);
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
          "Año y duración (minutos)",
          "Sinopsis",
          "Web",
          "Género",
          "Nacionalidad",
          "Distribuidor",
          "Director",
          "Clasificación",
        ]}
        actualPage={actualPage}
        pageSize={pageSize}
        totalSize={totalSize}
        nextPage={nextPage}
        isLoading={isLoading}
        canEdit={true}
        canSearch={true}
        renderCell={(movie: Movie) => <MovieCell movie={movie} />}
        onNextPage={fetchNext}
        onPreviousPage={fetchPrevious}
        onSearch={(search: string) => {
          setInputChanged(true);
          setInputName(search);
        }}
        onDelete={setDeleteId}
        onCreate={() => setUpdateMovie(false)}
        onUpdate={setUpdateMovie}
        customUpdateName={"Actores"}
        customUpdateIcon={"users"}
        onCustomUpdate={setUpdateMovieActors}
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
          <MovieForm movie={movie} onSubmit={handleUpdate} />
        )}
      />
      <UpdateModal
        show={updateMovieActors != null}
        title="Actores"
        element={updateMovieActors}
        onClose={() => setUpdateMovieActors(null)}
        renderForm={(movie: Movie | false | null) => (
          <MovieActorForm movie={movie} onSubmit={handleUpdateActorIds} />
        )}
      />
    </>
  );
}

export default MoviesPage;
