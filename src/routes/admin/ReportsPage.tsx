import { useEffect, useState } from "react";
import MovieAPI, { Movie, MovieCreate } from "../../api/MovieAPI";
import DataTable from "../../components/admin/DataTable";
import MovieActorForm from "../../components/admin/movies/MovieActorsForm";
import MovieCell from "../../components/admin/movies/MovieCell";
import MovieForm from "../../components/admin/movies/MovieForm";
import ReportSelectElement from "../../components/admin/reports/ReportSelectElement";
import DeleteModal from "../../components/modals/DeleteModal";
import UpdateModal from "../../components/modals/UpdateModal";
import useActors from "../../hooks/useActors";
import useAgeClassifications from "../../hooks/useAgeClassification";
import useDirectors from "../../hooks/useDirectors";
import useDistributors from "../../hooks/useDistributors";
import useFilteredMovies from "../../hooks/useFilteredMovies";
import useGenres from "../../hooks/useGenres";
import useNationalities from "../../hooks/useNationalities";
import useRooms from "../../hooks/useRooms";
import { publish } from "../../utils/CustomEvents";

function ReportsPage() {
  const [filters, setFilters] = useState<Map<string, number[]>>(
    new Map<string, number[]>()
  );
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
    setFiltersChanged,
    fetchNext,
    fetchCurrent,
    fetchPrevious,
  } = useFilteredMovies(filters);

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

  // Aquí se empieza a guardar toda la mecánica de selección de películas
  const { genres, fetchAll: fetchAllGenres } = useGenres("");
  const { directors, fetchAll: fetchAllDirectors } = useDirectors("");
  const { distributors, fetchAll: fetchAllDistributos } = useDistributors("");
  const { nationalities, fetchAll: fetchAllNationalities } =
    useNationalities("");
  const { ageClassifications, fetchAll: fetchAllAgesClassifications } =
    useAgeClassifications();
  const { rooms, fetchAll: fetchAllRooms } = useRooms("");
  const { actors, fetchAll: fetchAllActors } = useActors("");

  useEffect(() => {
    fetchAllGenres();
    fetchAllDirectors();
    fetchAllDistributos();
    fetchAllNationalities();
    fetchAllAgesClassifications();
    fetchAllRooms();
    fetchAllActors();
  }, []);

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedDirectors, setSelectedDirectors] = useState<number[]>([]);
  const [selectedDistributors, setSelectedDistributors] = useState<number[]>(
    []
  );
  const [selectedNationalities, setSelectedNationalities] = useState<number[]>(
    []
  );
  const [selectedAgeClassifications, setSelectedAgeClassifications] = useState<
    number[]
  >([]);
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [selectedActors, setSelectedActors] = useState<number[]>([]);

  useEffect(() => {
    const newFilters = new Map<string, number[]>();
    if (selectedGenres.length > 0) {
      newFilters.set("genre", selectedGenres);
    }
    if (selectedDirectors.length > 0) {
      newFilters.set("director", selectedDirectors);
    }
    if (selectedDistributors.length > 0) {
      newFilters.set("distributor", selectedDistributors);
    }
    if (selectedNationalities.length > 0) {
      newFilters.set("nationality", selectedNationalities);
    }
    if (selectedAgeClassifications.length > 0) {
      newFilters.set("ageClassification", selectedAgeClassifications);
    }
    if (selectedRooms.length > 0) {
      newFilters.set("room", selectedRooms);
    }
    if (selectedActors.length > 0) {
      newFilters.set("actorList", selectedActors);
    }
    setFilters(newFilters);
    setFiltersChanged(true);
  }, [
    selectedGenres,
    selectedDirectors,
    selectedDistributors,
    selectedNationalities,
    selectedAgeClassifications,
    selectedRooms,
    selectedActors,
  ]);

  const searchRender = () => {
    return (
      <div className="w-[800px]">
        <button
          onClick={(e) => {
            e.preventDefault();
            setSelectedGenres([]);
            setSelectedDirectors([]);
            setSelectedDistributors([]);
            setSelectedNationalities([]);
            setSelectedAgeClassifications([]);
            setSelectedRooms([]);
            setSelectedActors([]);
          }}
          className="mb-1 py-1 inline-flex items-center justify-center w-1/2 px-3 text-sm font-medium text-center text-white rounded-lg bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 sm:w-auto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Eliminar filtros
        </button>
        <ReportSelectElement
          elementName={"Actor"}
          elementPluralName={"Actores"}
          all={actors}
          selected={selectedActors}
          setSelected={setSelectedActors}
        />
        <ReportSelectElement
          elementName={"Sala"}
          elementPluralName={"Salas"}
          all={rooms}
          selected={selectedRooms}
          setSelected={setSelectedRooms}
        />
        <ReportSelectElement
          elementName={"Género"}
          elementPluralName={"Géneros"}
          all={genres}
          selected={selectedGenres}
          setSelected={setSelectedGenres}
        />
        <ReportSelectElement
          elementName={"Director"}
          elementPluralName={"Directores"}
          all={directors}
          selected={selectedDirectors}
          setSelected={setSelectedDirectors}
        />
        <ReportSelectElement
          elementName={"Distribuidor"}
          elementPluralName={"Distribuidores"}
          all={distributors}
          selected={selectedDistributors}
          setSelected={setSelectedDistributors}
        />
        <ReportSelectElement
          elementName={"Nacionalidad"}
          elementPluralName={"Nacionalidades"}
          all={nationalities}
          selected={selectedNationalities}
          setSelected={setSelectedNationalities}
        />
        <ReportSelectElement
          elementName={"Clasificación de edad"}
          elementPluralName={"Clasificaciones de edades"}
          all={ageClassifications}
          selected={selectedAgeClassifications}
          setSelected={setSelectedAgeClassifications}
        />
      </div>
    );
  };

  return (
    <>
      <DataTable
        data={movies}
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
        customSearch={() => searchRender()}
        renderCell={(movie: Movie) => <MovieCell movie={movie} />}
        onNextPage={fetchNext}
        onPreviousPage={fetchPrevious}
        onSearch={() => {}}
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

export default ReportsPage;
