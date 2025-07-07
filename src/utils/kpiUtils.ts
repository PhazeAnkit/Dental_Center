export function getDashboardStats() {
  const patients = JSON.parse(localStorage.getItem("patients") || "[]");
  const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
  const treatments = JSON.parse(localStorage.getItem("treatments") || "[]");

  const totalEarnings = appointments.reduce((sum: number, appt: any) => {
    return sum + (appt.billing?.amount || 0);
  }, 0);

  const upcoming = appointments.filter(
    (a: any) => new Date(a.date) > new Date()
  );

  return {
    totalPatients: patients.length,
    upcomingAppointments: upcoming.length,
    totalEarnings,
    treatmentsCompleted: treatments.length,
  };
}
