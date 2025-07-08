import { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayout";
import type { Patient } from "../types/storage";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

const PatientsPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [formData, setFormData] = useState<Partial<Patient>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const patientSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    dob: Yup.string().required("DOB is required"),
    contact: Yup.string()
      .min(10, "Must be at least 10 digits")
      .required("Contact is required"),
    healthInfo: Yup.string(),
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("patients") || "[]");
    setPatients(data);
    setLoading(false);
  }, []);

  const savePatients = (newList: Patient[]) => {
    setPatients(newList);
    localStorage.setItem("patients", JSON.stringify(newList));
  };

  const handleSubmit = async () => {
    try {
      await patientSchema.validate(formData);
      setFormError(null);

      const isDuplicate =
        !editingId && patients.some((p) => p.contact === formData.contact);

      if (isDuplicate) {
        setFormError("A patient with this contact already exists.");
        return;
      }

      if (editingId) {
        const updated = patients.map((p) =>
          p.id === editingId ? ({ ...p, ...formData } as Patient) : p
        );
        savePatients(updated);
      } else {
        const newPatient: Patient = {
          ...(formData as Patient),
          id: uuidv4(),
        };
        savePatients([...patients, newPatient]);
      }

      closeModal();
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      const filtered = patients.filter((p) => p.id !== id);
      savePatients(filtered);
    }
  };

  const startEdit = (patient: Patient) => {
    setEditingId(patient.id);
    setFormData(patient);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({});
    setEditingId(null);
    setFormError(null);
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.contact?.includes(search)
  );

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Patients</h2>
        <div className="flex gap-4 w-full md:w-auto flex-col md:flex-row">
          <input
            type="text"
            placeholder="Search by name/contact"
            className="input w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({});
              setShowModal(true);
            }}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            + Add Patient
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">
          Loading patients...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded shadow text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">DOB</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Health Info</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p) => (
                <tr
                  key={p.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.dob}</td>
                  <td className="p-3">{p.contact}</td>
                  <td className="p-3">{p.healthInfo}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      className="text-blue-600 dark:text-blue-400"
                      onClick={() => startEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 dark:text-red-400"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-4 text-gray-500 dark:text-gray-400"
                  >
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onKeyDown={(e) => e.key === "Escape" && closeModal()}
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-lg font-bold"
              aria-label="Close"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Patient" : "Add Patient"}
            </h3>

            {formError && (
              <div className="text-red-500 text-sm mb-2">{formError}</div>
            )}

            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="input"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="date"
                placeholder="Date of Birth"
                className="input"
                value={formData.dob || ""}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Contact Number"
                className="input"
                value={formData.contact || ""}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
              />
              <textarea
                placeholder="Health Information"
                className="input"
                rows={3}
                value={formData.healthInfo || ""}
                onChange={(e) =>
                  setFormData({ ...formData, healthInfo: e.target.value })
                }
              />
            </div>

            <div className="mt-4 flex gap-3 justify-end">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                {editingId ? "Update" : "Add"}
              </button>
              <button onClick={closeModal} className="text-sm text-gray-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default PatientsPage;
