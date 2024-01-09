import { useEffect, useState } from "react";
import RoomAPI, { Room, RoomCreate } from "../../api/RoomAPI";
import DataTable from "../../components/admin/DataTable";
import DeleteModal from "../../components/modals/DeleteModal";
import RoomCell from "../../components/admin/rooms/RoomCell";
import RoomForm from "../../components/admin/rooms/RoomForm";
import UpdateModal from "../../components/modals/UpdateModal";
import useRooms from "../../hooks/useRooms";
import { publish } from "../../utils/CustomEvents";

function RoomsPage() {
  const [inputName, setInputName] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [updateRoom, setUpdateRoom] = useState<Room | false | null>(null);
  const {
    rooms,
    nextPage,
    actualPage,
    pageSize,
    totalSize,
    isLoading,
    setInputChanged,
    fetchNext,
    fetchCurrent,
    fetchPrevious,
  } = useRooms(inputName);

  const handleDelete = () => {
    RoomAPI.deleteRoom(deleteId!)
      .then(() => {
        publish("showSuccessMessage", "Has eliminado la sala correctamente");
        fetchCurrent();
      })
      .catch((message) => {
        publish("showApiErrorMessage", message);
      })
      .finally(() => {
        setDeleteId(null);
      });
  };

  const handleUpdate = (room: RoomCreate) => {
    let promise: Promise<Room>;
    if (updateRoom) {
      promise = RoomAPI.updateRoom(updateRoom.id, room);
    } else {
      promise = RoomAPI.createRoom(room);
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
        setUpdateRoom(null);
      });
  };

  useEffect(() => {
    fetchNext();
  }, []);

  return (
    <>
      <DataTable
        data={rooms}
        title={"Salas"}
        columns={["Nombre", "Filas", "Columnas"]}
        actualPage={actualPage}
        pageSize={pageSize}
        totalSize={totalSize}
        nextPage={nextPage}
        isLoading={isLoading}
        canEdit={true}
        canSearch={true}
        renderCell={(room: Room) => <RoomCell room={room} />}
        onNextPage={fetchNext}
        onPreviousPage={fetchPrevious}
        onSearch={(search: string) => {
          setInputChanged(true);
          setInputName(search);
        }}
        onDelete={setDeleteId}
        onCreate={() => setUpdateRoom(false)}
        onUpdate={setUpdateRoom}
      />
      <DeleteModal
        show={deleteId != null}
        onClose={() => setDeleteId(null)}
        onDelete={handleDelete}
      />
      <UpdateModal
        show={updateRoom != null}
        title="Sala"
        element={updateRoom}
        onClose={() => setUpdateRoom(null)}
        renderForm={(room: Room | false | null) => (
          <RoomForm room={room} onSubmit={handleUpdate} />
        )}
      />
    </>
  );
}

export default RoomsPage;
