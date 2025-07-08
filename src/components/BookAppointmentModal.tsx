import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Incident } from "../types/storage";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onBook: (incident: Incident) => void;
  patientId: string;
}

const BookAppointmentModal = ({
  isOpen,
  onClose,
  onBook,
  patientId,
}: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = () => {
    if (!title || !appointmentDate) return;

    const newIncident: Incident = {
      id: uuidv4(),
      patientId,
      title,
      description,
      comments,
      appointmentDate,
      cost: 0,
      status: "Pending",
      files: [],
    };

    onBook(newIncident);
    onClose();
    setTitle("");
    setDescription("");
    setAppointmentDate("");
    setComments("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Book New Appointment</h2>

        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Appointment Title"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="datetime-local"
            className="input"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
          <textarea
            placeholder="Comments"
            className="input"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button onClick={onClose} className="text-sm text-gray-500">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentModal;
