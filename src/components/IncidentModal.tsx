import { useEffect, useState } from "react";
import type { Incident, Patient } from "../types/storage";
import { v4 as uuidv4 } from "uuid";
import { fileToBase64 } from "../utils/fileToBase64";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (incident: Incident) => void;
  patients: Patient[];
  editingIncident?: Incident | null;
}

const defaultStatus = "Pending";

const IncidentModal = ({
  isOpen,
  onClose,
  onSave,
  patients,
  editingIncident,
}: Props) => {
  const [form, setForm] = useState<Partial<Incident>>({});
  const [filesPreview, setFilesPreview] = useState<
    { name: string; url: string }[]
  >([]);

  useEffect(() => {
    if (editingIncident) {
      setForm(editingIncident);
      setFilesPreview(editingIncident.files || []);
    } else {
      setForm({});
      setFilesPreview([]);
    }
  }, [editingIncident]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const uploads = await Promise.all(
        Array.from(fileList).map(async (file) => ({
          name: file.name,
          url: await fileToBase64(file),
        }))
      );
      setFilesPreview([...filesPreview, ...uploads]);
    }
  };

  const handleSubmit = () => {
    if (!form.patientId || !form.title || !form.appointmentDate) return;

    const newIncident: Incident = {
      id: editingIncident?.id || uuidv4(),
      patientId: form.patientId,
      title: form.title,
      description: form.description || "",
      comments: form.comments || "",
      appointmentDate: form.appointmentDate,
      cost: Number(form.cost || 0),
      status: (form.status as "Pending" | "Completed") || defaultStatus,
      files: filesPreview,
    };

    onSave(newIncident);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 w-full max-w-xl p-6 rounded relative">
        <button className="absolute right-4 top-2 text-2xl" onClick={onClose}>
          &times;
        </button>
        <h3 className="text-xl font-bold mb-4">
          {editingIncident ? "Edit Incident" : "Add Incident"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            value={form.patientId || ""}
            onChange={(e) => setForm({ ...form, patientId: e.target.value })}
            className="input"
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Title"
            className="input"
            value={form.title || ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="datetime-local"
            className="input"
            value={form.appointmentDate || ""}
            onChange={(e) =>
              setForm({ ...form, appointmentDate: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Cost"
            className="input"
            value={form.cost || ""}
            onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })}
          />
          <select
            value={form.status || defaultStatus}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as any })
            }
            className="input"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <textarea
            placeholder="Description"
            className="input sm:col-span-2"
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <textarea
            placeholder="Comments"
            className="input sm:col-span-2"
            value={form.comments || ""}
            onChange={(e) => setForm({ ...form, comments: e.target.value })}
          />
          <input
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="sm:col-span-2"
          />
        </div>

        {filesPreview.length > 0 && (
          <div className="mt-4 text-sm sm:col-span-2">
            <strong>Attached Files:</strong>
            <ul className="list-disc list-inside text-xs">
              {filesPreview.map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-4">
          <button onClick={onClose} className="text-sm text-gray-500">
            Cancel
          </button>
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentModal;
