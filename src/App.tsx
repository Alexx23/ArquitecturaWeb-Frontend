import { Route, Routes } from "react-router-dom";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import AdminDashboardPage from "./routes/admin/AdminDashboardPage";
import Error404 from "./routes/errors/Error404";
import ErrorBoundary from "./routes/errors/ErrorBoundary";
import RequireAuth from "./utils/RequireAuth";
import RoleEnum from "./utils/RoleEnum";

function App() {
  return (
    <Routes>
      <Route path="/" errorElement={<ErrorBoundary />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route
        path="/admin"
        element={<RequireAuth allowedRoles={[RoleEnum.ADMIN]} />}
        errorElement={<ErrorBoundary />}
      >
        <Route index element={<AdminDashboardPage />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
