import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext";
import { Bars3Icon } from "@heroicons/react/24/outline";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";

const Topbar = () => {
  const { toggleTheme, darkMode } = useContext(ThemeContext);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toggleSidebar, toggleCollapse, collapsed } = useSidebar();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center gap-4">
        {/* Mobile hamburger */}
        <button onClick={toggleSidebar} className="md:hidden">
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* Desktop collapse toggle */}
        <button onClick={toggleCollapse} className="hidden md:inline-flex">
          {collapsed ? (
            <ChevronDoubleRightIcon className="h-5 w-5" />
          ) : (
            <ChevronDoubleLeftIcon className="h-5 w-5" />
          )}
        </button>

        <h1 className="text-xl font-semibold hidden md:block">
          Admin Dashboard
        </h1>
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
