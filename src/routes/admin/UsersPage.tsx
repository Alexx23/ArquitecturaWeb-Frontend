import { useEffect, useState } from "react";
import UserAPI, { User } from "../../api/UserAPI";
import DataTable from "../../components/admin/DataTable";
import DeleteModal from "../../components/modals/DeleteModal";
import UserCell from "../../components/admin/users/UserCell";
import useUsers from "../../hooks/useUsers";
import { publish } from "../../utils/CustomEvents";

function UsersPage() {
  const [inputName, setInputName] = useState("");
  const {
    users,
    nextPage,
    actualPage,
    pageSize,
    totalSize,
    isLoading,
    setInputChanged,
    fetchNext,
    fetchPrevious,
  } = useUsers(inputName);

  useEffect(() => {
    fetchNext();
  }, []);

  return (
    <>
      <DataTable
        data={users}
        title={"Usuarios"}
        columns={["Nombre", "Email", "Tickets", "Fecha de Creación"]}
        actualPage={actualPage}
        pageSize={pageSize}
        totalSize={totalSize}
        nextPage={nextPage}
        isLoading={isLoading}
        canEdit={false}
        canSearch={true}
        renderCell={(user: User) => <UserCell user={user} />}
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

export default UsersPage;
