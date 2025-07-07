import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import type { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background dark:bg-darkBg text-black dark:text-white overflow-x-hidden">
      {/* Sidebar: will be hidden by default on mobile */}
      <Sidebar />

      {/* Main layout */}
      <div className="flex flex-col flex-1 transition-all duration-300">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
