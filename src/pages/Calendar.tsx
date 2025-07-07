import { useEffect, useState, useContext } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarStyles.css'
import AdminLayout from "../Layout/AdminLayout";
import { ThemeContext } from "../contexts/ThemeContext";

interface Appointment {
  id: string;
  date: string;
  patientName: string;
  treatment: string;
}

const CalendarView = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dayAppointments, setDayAppointments] = useState<Appointment[]>([]);
  const { darkMode } = useContext(ThemeContext); // ← get theme

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments") || "[]");
    setAppointments(data);
  }, []);

  useEffect(() => {
    const filtered = appointments.filter((appt) => {
      const apptDate = new Date(appt.date);
      return apptDate.toDateString() === selectedDate.toDateString();
    });
    setDayAppointments(filtered);
  }, [selectedDate, appointments]);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Appointment Calendar</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg p-4 shadow bg-white dark:bg-gray-800">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className={`react-calendar ${darkMode ? "react-calendar--dark" : ""}`}
            tileContent={({ date, view }) => {
              if (view === "month") {
                const match = appointments.some(
                  (appt) =>
                    new Date(appt.date).toDateString() === date.toDateString()
                );
                return match ? (
                  <div className="w-2 h-2 mt-1 mx-auto rounded-full bg-primary" />
                ) : null;
              }
              return null;
            }}
          />
        </div>

        <div className="rounded-lg p-4 shadow bg-white dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-3">
            Appointments on {selectedDate.toDateString()}
          </h3>
          {dayAppointments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">No appointments.</p>
          ) : (
            <ul className="space-y-3">
              {dayAppointments.map((appt) => (
                <li key={appt.id} className="p-3 border rounded-lg dark:border-gray-700">
                  <p className="font-medium">{appt.patientName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Treatment: {appt.treatment}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Date: {new Date(appt.date).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CalendarView;
