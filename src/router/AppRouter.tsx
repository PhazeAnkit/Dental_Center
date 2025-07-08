import { Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "../pages/Login";
import TestPage from "../pages/TestPage";
import Dashboard from "../pages/Dashboard";
import CalendarView from "../pages/Calendar";
import PatientsPage from "../pages/PatientsPages";
import PatientDetailPage from "../pages/PatientDetailPage";
import PatientDashboard from "../pages/PatientDashboard";
import IncidentPage from "../pages/IncidentPage";

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/test" element={<TestPage />} />

      {user?.role === "Admin" && (
        <>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/patients" element={<PatientsPage />} />
          <Route path="/admin/calendar" element={<CalendarView />} />
          <Route path="/admin/patients/:id" element={<PatientDetailPage />} />
          <Route path="/admin/incidents" element={<IncidentPage />} />
        </>
      )}

      {user?.role === "Patient" && (
        <>
          <Route path="/patient" element={<PatientDashboard />} />
        </>
      )}

      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRouter;
