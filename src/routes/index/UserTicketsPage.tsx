import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CardAPI, { Card, CardCreate } from "../../api/CardAPI";
import { Payment } from "../../api/PaymentAPI";
import { Ticket } from "../../api/TicketAPI";
import UserAPI, { ChangePassword, UserUpdate } from "../../api/UserAPI";
import DataTable from "../../components/admin/DataTable";
import CardForm from "../../components/client/CardForm";
import Navbar from "../../components/client/Navbar";
import UserPaymentCell from "../../components/client/UserPaymentCell";
import UserTicketCell from "../../components/client/UserTicketCell";
import Loading from "../../components/Loading";
import ApiErrorModal from "../../components/modals/ApiErrorModal";
import DeleteModal from "../../components/modals/DeleteModal";
import SuccessModal from "../../components/modals/SuccessModal";
import UpdateModal from "../../components/modals/UpdateModal";
import { useUser } from "../../context/UserContext";
import usePayments from "../../hooks/usePayments";
import useTickets from "../../hooks/useTickets";
import { publish } from "../../utils/CustomEvents";
import { formatCardExpirationDate } from "../../utils/DateUtils";

export default function UserTicketsPage() {
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
              columns={["Película", "Sesión", "Fecha de Compra", "Butaca"]}
              actualPage={actualPageTickets}
              pageSize={pageSizeTickets}
              totalSize={totalSizeTickets}
              nextPage={nextPageTickets}
              isLoading={isLoadingTickets}
              canEdit={false}
              canSearch={false}
              renderCell={(ticket: Ticket) => (
                <UserTicketCell ticket={ticket} />
              )}
              onNextPage={fetchNextTickets}
              onPreviousPage={fetchPreviousTickets}
              onSearch={() => {}}
              onDelete={() => {}}
              onCreate={() => {}}
              onUpdate={() => {}}
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
    </>
  );
}
