import { ErrorBoundary as ErrorBoundaryGlobal } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";
import ApiErrorModal from "./components/modals/ApiErrorModal";
import SuccessModal from "./components/modals/SuccessModal";
import AdminLayout from "./routes/AdminLayout";
import Error404 from "./routes/errors/Error404";
import ErrorBoundary from "./routes/errors/ErrorBoundary";
import IndexLayout from "./routes/IndexLayout";
import RequireAuth from "./utils/RequireAuth";
import RoleEnum from "./utils/RoleEnum";

function App() {
  return (
    <>
      <ErrorBoundaryGlobal fallback={<ErrorBoundary />}>
        <Routes>
          <Route
            path="/*"
            element={<IndexLayout />}
            errorElement={<ErrorBoundary />}
          />
          <Route
            path="/admin/*"
            element={
              <>
                <RequireAuth allowedRoles={[RoleEnum.ADMIN]} />
                <AdminLayout />
              </>
            }
            errorElement={<ErrorBoundary />}
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <ApiErrorModal />
        <SuccessModal />
      </ErrorBoundaryGlobal>
    </>
  );
}

export default App;
