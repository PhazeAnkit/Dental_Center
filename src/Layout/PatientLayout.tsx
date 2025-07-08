import Topbar from "../components/Topbar";
import type { ReactNode } from "react";

const PatientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-darkBg text-black dark:text-white overflow-x-hidden">
      <Topbar />
      <main className="p-6">{children}</main>
    </div>
  );
};

export default PatientLayout;
