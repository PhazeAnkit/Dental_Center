import { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayout";
import KpiCard from "../components/KpiCards";
import {
  UsersIcon,
  CalendarDaysIcon,
  CurrencyRupeeIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { getDashboardStats } from "../utils/kpiUtils";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    upcomingAppointments: 0,
    totalEarnings: 0,
    treatmentsCompleted: 0,
  });

  useEffect(() => {
    const data = getDashboardStats();
    setStats(data);
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Welcome, Admin! 🦷</h2>

      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        <KpiCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={<UsersIcon className="h-8 w-8 text-cyan-500" />}
        />
        <KpiCard
          title="Upcoming Appointments"
          value={stats.upcomingAppointments}
          icon={<CalendarDaysIcon className="h-8 w-8 text-orange-500" />}
        />
        <KpiCard
          title="Earnings (This Month)"
          value={`₹${stats.totalEarnings.toLocaleString()}`}
          icon={<CurrencyRupeeIcon className="h-8 w-8 text-green-600" />}
        />
        <KpiCard
          title="Treatments Completed"
          value={stats.treatmentsCompleted}
          icon={
            <ClipboardDocumentCheckIcon className="h-8 w-8 text-indigo-500" />
          }
        />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
