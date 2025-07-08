// src/pages/PatientIncidentsPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayout";
import type { Patient, Incident } from "../types/storage";

const PatientIncidentsPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const allPatients = JSON.parse(localStorage.getItem("patients") || "[]");
    const foundPatient = allPatients.find((p: Patient) => p.id === id);
    setPatient(foundPatient);

    const allIncidents = JSON.parse(localStorage.getItem("incidents") || "[]");
    const filtered = allIncidents.filter((i: Incident) => i.patientId === id);
    setIncidents(filtered);
  }, [id]);

  if (!patient) return <div className="p-6">Loading...</div>;

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">
        Incident History for {patient.name}
      </h2>

      <ul className="space-y-4">
        {incidents.map((inc) => (
          <li
            key={inc.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow"
          >
            <p className="font-semibold">{inc.title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {inc.description}
            </p>
            <p className="text-xs text-gray-400">
              Appointment: {new Date(inc.appointmentDate).toLocaleString()}
            </p>
            {inc.files?.length > 0 && (
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                <strong>Files:</strong>
                <ul className="list-disc list-inside">
                  {inc.files.map((file, i) => (
                    <li key={i}>
                      <a
                        href={file.url}
                        download={file.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-500"
                      >
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>

      {incidents.length === 0 && (
        <p className="text-gray-500 dark:text-gray-300">No incidents found.</p>
      )}
    </AdminLayout>
  );
};

export default PatientIncidentsPage;
