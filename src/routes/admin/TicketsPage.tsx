import { useEffect, useState } from "react";
import TicketAPI, { Ticket, TicketCreate } from "../../api/TicketAPI";
import DataTable from "../../components/admin/DataTable";
import DeleteModal from "../../components/admin/DeleteModal";
import TicketCell from "../../components/admin/tickets/TicketCell";
import useTickets from "../../hooks/useTickets";
import { publish } from "../../utils/CustomEvents";

function TicketsPage() {
  const [inputName, setInputName] = useState("");
  const {
    tickets,
    nextPage,
    actualPage,
    pageSize,
    totalSize,
    isLoading,
    setInputChanged,
    fetchNext,
    fetchPrevious,
  } = useTickets(inputName);

  useEffect(() => {
    fetchNext();
  }, []);

  return (
    <>
      <DataTable
        data={tickets}
        title={"Tickets"}
        columns={["Usuario", "Película", "Sesión", "Compra", "Fila", "Columna"]}
        actualPage={actualPage}
        pageSize={pageSize}
        totalSize={totalSize}
        nextPage={nextPage}
        isLoading={isLoading}
        canEdit={false}
        canSearch={false}
        renderCell={(ticket: Ticket) => <TicketCell ticket={ticket} />}
        onNextPage={fetchNext}
        onPreviousPage={fetchPrevious}
        onSearch={(search: string) => {
          setInputChanged(true);
          setInputName(search);
        }}
        onDelete={() => {}}
        onCreate={() => {}}
        onUpdate={() => {}}
      />
    </>
  );
}

export default TicketsPage;
