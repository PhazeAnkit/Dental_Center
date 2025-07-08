import { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayout";
import IncidentModal from "../components/IncidentModal";
import type { Incident, Patient } from "../types/storage";

const IncidentPage = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const inc = JSON.parse(localStorage.getItem("incidents") || "[]");
    const pats = JSON.parse(localStorage.getItem("patients") || "[]");
    setIncidents(inc);
    setPatients(pats);
  }, []);

  const saveIncidents = (list: Incident[]) => {
    setIncidents(list);
    localStorage.setItem("incidents", JSON.stringify(list));
  };

  const handleSave = (incident: Incident) => {
    if (editingIncident) {
      const updated = incidents.map((i) =>
        i.id === incident.id ? incident : i
      );
      saveIncidents(updated);
    } else {
      saveIncidents([...incidents, incident]);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this incident?")) {
      const filtered = incidents.filter((i) => i.id !== id);
      saveIncidents(filtered);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Incidents</h2>
        <button
          onClick={() => {
            setEditingIncident(null);
            setShowModal(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          + Add Incident
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 rounded shadow text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((i) => {
              const patient = patients.find((p) => p.id === i.patientId);
              return (
                <tr key={i.id} className="border-b dark:border-gray-700">
                  <td className="p-3">{patient?.name || "Unknown"}</td>
                  <td className="p-3">{i.title}</td>
                  <td className="p-3">
                    {new Date(i.appointmentDate).toLocaleString()}
                  </td>
                  <td className="p-3">{i.status}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      className="text-blue-600 dark:text-blue-400"
                      onClick={() => {
                        setEditingIncident(i);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 dark:text-red-400"
                      onClick={() => handleDelete(i.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {incidents.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-4 text-gray-500 dark:text-gray-400"
                >
                  No incidents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <IncidentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        patients={patients}
        editingIncident={editingIncident}
      />
    </AdminLayout>
  );
};

export default IncidentPage;
