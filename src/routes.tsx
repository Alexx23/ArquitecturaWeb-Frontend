import { Route, Routes } from "react-router-dom";
import AdminPage from "./routes/AdminPage";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import Error404 from "./routes/errors/Error404";
import ErrorBoundary from "./routes/errors/ErrorBoundary";
import RequireAuth from "./utils/RequireAuth";
import RoleEnum from "./utils/RoleEnum";
import ClientMoviesPage from "./routes/ClientMoviesPage";
import ProfilePage from "./routes/client/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" errorElement={<ErrorBoundary />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/profile"
          element={
            <>
              <RequireAuth allowedRoles={[RoleEnum.CLIENT, RoleEnum.ADMIN]} />
              <ProfilePage />
            </>
          }
        />
        <Route path="/movies/*" element={<ClientMoviesPage />} />
      </Route>
      <Route
        path="/admin/*"
        element={
          <>
            <RequireAuth allowedRoles={[RoleEnum.ADMIN]} />
            <AdminPage />
          </>
        }
        errorElement={<ErrorBoundary />}
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
