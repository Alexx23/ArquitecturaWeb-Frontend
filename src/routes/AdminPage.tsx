import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminFooter from "../components/admin/Footer";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/Sidebar";
import ApiErrorModal from "../components/modals/ApiErrorModal";
import SuccessModal from "../components/modals/SuccessModal";
import ActorsPage from "./admin/ActorPage";
import DirectorsPage from "./admin/DirectorsPage";
import DistributorsPage from "./admin/DistributorsPage";
import GenresPage from "./admin/GenresPage";
import MoviesPage from "./admin/MoviesPage";
import NationalitiesPage from "./admin/NationalitiesPage";
import RoomsPage from "./admin/RoomsPage";
import TicketsPage from "./admin/TicketsPage";
import UsersPage from "./admin/UsersPage";
import Error404 from "./errors/Error404";
import SessionsPage from "./admin/SessionsPage";

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

        <div className="min-h-screen relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
          <main>
            <Routes>
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/genres" element={<GenresPage />} />
              <Route path="/actors" element={<ActorsPage />} />
              <Route path="/directors" element={<DirectorsPage />} />
              <Route path="/distributors" element={<DistributorsPage />} />
              <Route path="/nationalities" element={<NationalitiesPage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/sessions" element={<SessionsPage />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/users" element={<UsersPage />} />
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
