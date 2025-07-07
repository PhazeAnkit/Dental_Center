import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "../pages/Login";
import TestPage from "../pages/TestPage";

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/test" element={<TestPage />} />

      {/* Protected Routes */}
      <Route
        path="/admin"
        element={
          user?.role === "Admin" ? <div>Admin Page</div> : <Navigate to="/" />
        }
      />
      <Route
        path="/patient"
        element={
          user?.role === "Patient" ? (
            <div>Patient Page</div>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Fallback */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRouter;
