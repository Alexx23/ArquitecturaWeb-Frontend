import { Route, Routes } from "react-router-dom";
import AdminLayout from "./routes/AdminLayout";
import HomePage from "./routes/index/IndexPage";
import LoginPage from "./routes/index/LoginPage";
import RegisterPage from "./routes/index/RegisterPage";
import Error404 from "./routes/errors/Error404";
import ErrorBoundary from "./routes/errors/ErrorBoundary";
import RequireAuth from "./utils/RequireAuth";
import RoleEnum from "./utils/RoleEnum";
import ClientMoviesPage from "./routes/MoviesLayout";
import ProfilePage from "./routes/index/ProfilePage";
import TermsConditions from "./routes/index/TermsConditionsPage";
import PrivacyPolicy from "./routes/index/PrivacyPolicyPage";
import IndexLayout from "./routes/IndexLayout";
import ApiErrorModal from "./components/modals/ApiErrorModal";
import SuccessModal from "./components/modals/SuccessModal";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
