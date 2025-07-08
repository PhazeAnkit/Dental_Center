import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import PatientLayout from "../Layout/PatientLayout";
import type { Patient, Incident } from "../types/storage";
import BookAppointmentModal from "../components/BookAppointmentModal";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [showBooking, setShowBooking] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    if (!user?.patientId) return;

    const allPatients: Patient[] = JSON.parse(
      localStorage.getItem("patients") || "[]"
    );
    const matched = allPatients.find((p) => p.id === user.patientId);
    setPatient(matched || null);

    const allIncidents: Incident[] = JSON.parse(
      localStorage.getItem("incidents") || "[]"
    );
    const patientIncidents = allIncidents.filter(
      (i) => i.patientId === user.patientId
    );
    setIncidents(patientIncidents);
  }, [user]);

  const handleBookAppointment = (newIncident: Incident) => {
    const all = JSON.parse(localStorage.getItem("incidents") || "[]");
    const updated = [...all, newIncident];
    localStorage.setItem("incidents", JSON.stringify(updated));
    setIncidents(updated.filter((i) => i.patientId === user.patientId));
    setConfirmation(true);
    setTimeout(() => setConfirmation(false), 3000);
  };

  if (!patient) return <div className="p-6">Loading...</div>;

  return (
    <PatientLayout>
      <h2 className="text-2xl font-bold mb-4">Welcome, {patient.name}</h2>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Your Profile</h3>
        <button
          onClick={() => setShowBooking(true)}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          + Book Appointment
        </button>
      </div>

      <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p>
            <strong>DOB:</strong> {patient.dob}
          </p>
          <p>
            <strong>Contact:</strong> {patient.contact}
          </p>
          <p className="sm:col-span-2">
            <strong>Health Info:</strong> {patient.healthInfo}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">Your Treatment History</h3>
        {incidents.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            No incidents recorded yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {incidents.map((inc) => (
              <li key={inc.id} className="border-b pb-3 dark:border-gray-700">
                <p className="font-semibold">{inc.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {inc.description}
                </p>
                <p className="text-xs text-gray-400">
                  Appointment: {new Date(inc.appointmentDate).toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">Status: {inc.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {confirmation && (
        <div className="mt-4 text-green-600 text-sm">
          ✅ Appointment submitted successfully!
        </div>
      )}

      <BookAppointmentModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        onBook={handleBookAppointment}
        patientId={user.patientId}
      />
    </PatientLayout>
  );
};

export default PatientDashboard;
