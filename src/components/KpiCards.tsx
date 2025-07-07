import type { ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
}

const KpiCard = ({ title, value, icon, className = "" }: KpiCardProps) => {
  return (
    <div
      className={`flex items-center justify-between p-5 rounded-xl shadow-md bg-white dark:bg-cardDark transition hover:scale-[1.02] duration-300 ${className}`}
    >
      <div>
        <h3 className="text-sm text-gray-500 dark:text-gray-300 mb-1">
          {title}
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
      {icon && <div className="text-4xl opacity-40">{icon}</div>}
    </div>
  );
};

export default KpiCard;
