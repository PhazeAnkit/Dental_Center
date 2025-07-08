import type { User, Patient, Incident } from "../types/storage";

export const seedMockData = () => {
  if (!localStorage.getItem("users")) {
    const mockUsers: User[] = [
      { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
      {
        id: "2",
        role: "Patient",
        email: "john@entnt.in",
        password: "patient123",
        patientId: "p1",
      },
    ];

    const mockPatients: Patient[] = [
      {
        id: "p1",
        name: "John Doe",
        dob: "1990-05-10",
        contact: "1234567890",
        healthInfo: "No allergies",
      },
    ];

    const mockIncidents: Incident[] = [
      {
        id: "i1",
        patientId: "p1",
        title: "Toothache",
        description: "Upper molar pain",
        comments: "Sensitive to cold",
        appointmentDate: "2025-07-01T10:00:00",
        cost: 80,
        status: "Completed",
        files: [
          { name: "invoice.pdf", url: "base64string" },
          { name: "xray.png", url: "base64string" },
        ],
      },
    ];

    localStorage.setItem("users", JSON.stringify(mockUsers));
    localStorage.setItem("patients", JSON.stringify(mockPatients));
    localStorage.setItem("incidents", JSON.stringify(mockIncidents));
    console.log("✅ Mock data seeded");
  }
};
