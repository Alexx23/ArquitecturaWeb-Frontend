import { useEffect, useState } from "react";
import { Ticket } from "../../api/TicketAPI";
import DataTable from "../../components/admin/DataTable";
import TicketCell from "../../components/admin/tickets/TicketCell";
import useTickets from "../../hooks/useTickets";

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
        columns={[
          "Usuario",
          "Película",
          "Sesión",
          "Fecha de Compra",
          "Profundidad",
          "Asiento de fila",
        ]}
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
