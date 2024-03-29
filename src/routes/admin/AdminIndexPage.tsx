import { useEffect } from "react";
import { Payment } from "../../api/PaymentAPI";
import DataTable from "../../components/admin/DataTable";
import PaymentCell from "../../components/admin/payments/PaymentCell";
import usePayments from "../../hooks/usePayments";

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
        title={"Ventas"}
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
