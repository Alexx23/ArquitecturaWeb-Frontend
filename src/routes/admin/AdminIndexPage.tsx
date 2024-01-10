import { useEffect, useState } from "react";
import PaymentAPI, { Payment } from "../../api/PaymentAPI";
import DataTable from "../../components/admin/DataTable";
import DeleteModal from "../../components/modals/DeleteModal";
import PaymentCell from "../../components/admin/payments/PaymentCell";
import usePayments from "../../hooks/usePayments";
import { publish } from "../../utils/CustomEvents";

function AdminIndexPage() {
  const {
    payments,
    nextPage,
    actualPage,
    pageSize,
    totalSize,
    isLoading,
    fetchNext,
    fetchPrevious,
  } = usePayments("");

  useEffect(() => {
    fetchNext();
  }, []);

  return (
    <>
      <DataTable
        data={payments}
        title={"Panel de ventas"}
        columns={[
          "Usuario",
          "Fecha de Compra",
          "Precio",
          "Referencia",
          "Titular de compra",
        ]}
        actualPage={actualPage}
        pageSize={pageSize}
        totalSize={totalSize}
        nextPage={nextPage}
        isLoading={isLoading}
        canEdit={false}
        canSearch={false}
        renderCell={(payment: Payment) => <PaymentCell payment={payment} />}
        onNextPage={fetchNext}
        onPreviousPage={fetchPrevious}
        onSearch={() => {}}
        onDelete={() => {}}
        onCreate={() => {}}
        onUpdate={() => {}}
      />
    </>
  );
}

export default AdminIndexPage;
