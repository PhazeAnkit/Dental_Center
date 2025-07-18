import { NavLink } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: PresentationChartBarIcon },
  { path: "/admin/patients", label: "Patients", icon: UserCircleIcon },
  { path: "/admin/calendar", label: "Calendar", icon: CalendarDaysIcon },
  {
    path: "/admin/incidents",
    label: "Incidents",
    icon: ClipboardDocumentListIcon,
  },
];

const Sidebar = () => {
  const { isOpen, collapsed, toggleCollapse, closeSidebar } = useSidebar();

  return (
    <aside
      className={`fixed md:relative top-0 left-0 h-full z-40 bg-white dark:bg-gray-900 shadow-lg transform transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 py-4">
        {!collapsed && <div className="font-bold text-lg">ENTNT Admin</div>}
        <button
          onClick={toggleCollapse}
          className="text-gray-500 hover:text-black dark:hover:text-white"
        >
          {collapsed ? (
            <ChevronDoubleRightIcon className="h-5 w-5" />
          ) : (
            <ChevronDoubleLeftIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-1 px-2">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
            onClick={() => {
              if (window.innerWidth < 768) closeSidebar();
            }}
          >
            <Icon className="h-5 w-5" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
