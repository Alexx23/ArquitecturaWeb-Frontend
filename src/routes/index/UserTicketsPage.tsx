import { useEffect, useState } from "react";
import { Payment } from "../../api/PaymentAPI";
import { Ticket } from "../../api/TicketAPI";
import DataTable from "../../components/admin/DataTable";
import UserPaymentCell from "../../components/client/UserPaymentCell";
import UserTicketCell from "../../components/client/UserTicketCell";
import ViewTicketModal from "../../components/modals/ViewTicketModal";
import usePayments from "../../hooks/usePayments";
import useTickets from "../../hooks/useTickets";

export default function UserTicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const {
    tickets,
    nextPage: nextPageTickets,
    actualPage: actualPageTickets,
    pageSize: pageSizeTickets,
    totalSize: totalSizeTickets,
    isLoading: isLoadingTickets,
    fetchNext: fetchNextTickets,
    fetchPrevious: fetchPreviousTickets,
  } = useTickets("", true);

  const {
    payments,
    nextPage: nextPagePayments,
    actualPage: actualPagePayments,
    pageSize: pageSizePayments,
    totalSize: totalSizePayments,
    isLoading: isLoadingPayments,
    fetchNext: fetchNextPayments,
    fetchPrevious: fetchPreviousPayments,
  } = usePayments("", true);

  useEffect(() => {
    fetchNextTickets();
    fetchNextPayments();
  }, []);

  return (
    <>
      <div className="pb-40 grid grid-cols-1 xl:grid-cols-5 xl:gap-4 dark:bg-gray-900">
        <div className="mb-4 col-span-full xl:mb-2">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Mis tickets
          </h1>
        </div>

        <div className="col-span-3">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <DataTable
              data={tickets}
              title={"Tickets"}
              columns={["Película", "Sesión", "Butaca"]}
              actualPage={actualPageTickets}
              pageSize={pageSizeTickets}
              totalSize={totalSizeTickets}
              nextPage={nextPageTickets}
              isLoading={isLoadingTickets}
              canEdit={false}
              canSearch={false}
              customUpdateName={"Ver"}
              customUpdateIcon={"qrcode"}
              renderCell={(ticket: Ticket) => (
                <UserTicketCell ticket={ticket} />
              )}
              onNextPage={fetchNextTickets}
              onPreviousPage={fetchPreviousTickets}
              onSearch={() => {}}
              onDelete={() => {}}
              onCreate={() => {}}
              onUpdate={() => {}}
              onCustomUpdate={(ticket: Ticket) => setSelectedTicket(ticket)}
            />
          </div>
        </div>
        <div className="col-span-full xl:col-span-2">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="flow-root">
              <DataTable
                data={payments}
                title={"Pagos"}
                columns={["Fecha de Compra", "Precio", "Referencia"]}
                actualPage={actualPagePayments}
                pageSize={pageSizePayments}
                totalSize={totalSizePayments}
                nextPage={nextPagePayments}
                isLoading={isLoadingPayments}
                canEdit={false}
                canSearch={false}
                renderCell={(payment: Payment) => (
                  <UserPaymentCell payment={payment} />
                )}
                onNextPage={fetchNextPayments}
                onPreviousPage={fetchPreviousPayments}
                onSearch={() => {}}
                onDelete={() => {}}
                onCreate={() => {}}
                onUpdate={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
      <ViewTicketModal
        show={selectedTicket != null}
        onClose={() => setSelectedTicket(null)}
        ticket={selectedTicket}
      />
    </>
  );
}
