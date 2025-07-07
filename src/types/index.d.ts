export interface User {
  id: string;
  email: string;
  password: string;
  role: "Admin" | "Patient";
  patientId?: string;
}

export interface Patient {
  id: string;
  name: string;
  dob: string;
  contact: string;
  healthInfo: string;
}

export interface IncidentFile {
  name: string;
  url: string;
}

export interface Incident {
  id: string;
  patientId: string;
  title: string;
  description: string;
  comments: string;
  appointmentDate: string;
  cost: number;
  status: "Pending" | "Completed";
  files: IncidentFile[];
}
