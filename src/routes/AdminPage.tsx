import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminFooter from "../components/admin/Footer";
import AdminNavbar from "../components/admin/Navbar";
import AdminSidebar from "../components/admin/Sidebar";
import ApiErrorModal from "../components/modals/ApiErrorModal";
import SuccessModal from "../components/modals/SuccessModal";
import MoviesPage from "./admin/MoviesPage";
import Error404 from "./errors/Error404";

function AdminPage() {
  const [sidebarMobileShow, setSidebarMobileShow] = useState(false);

  return (
    <>
      <AdminNavbar
        sidebarMobileShow={sidebarMobileShow}
        onClickSidebarMobile={() => setSidebarMobileShow(!sidebarMobileShow)}
      />
      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <AdminSidebar sidebarMobileShow={sidebarMobileShow} />

        <div
          className="min-h-screen relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
        >
          <main>
            <Routes>
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="*" element={<Error404 goTo="/admin" />} />
            </Routes>
          </main>
          <AdminFooter />
        </div>
      </div>
      <ApiErrorModal />
      <SuccessModal />
    </>
  );
}

export default AdminPage;
