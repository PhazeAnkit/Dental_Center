import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useSidebar } from "../contexts/SidebarContext";

const Topbar = () => {
  const { toggleTheme, darkMode } = useContext(ThemeContext);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleSidebar } = useSidebar();

  const isPatient =
    user?.role === "Patient" || location.pathname.startsWith("/patient");

  const title = isPatient ? "Patient Dashboard" : "Admin Dashboard";

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center gap-4">
        {!isPatient && (
          <button onClick={toggleSidebar} className="md:hidden">
            <Bars3Icon className="h-6 w-6" />
          </button>
        )}
        <h1 className="text-xl font-semibold hidden md:block">{title}</h1>
      </div>

      <div className="flex gap-4 items-center">
        <button
          onClick={toggleTheme}
          className="text-sm px-3 py-1 border rounded"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="text-sm px-3 py-1 border border-red-500 text-red-500 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
