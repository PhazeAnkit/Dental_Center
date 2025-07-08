# 🦷 ENTNT Dental Care Admin Dashboard (React + Tailwind)

A modern and responsive dental center management dashboard built using **React**, **TypeScript**, and **TailwindCSS**. Designed to manage patients, appointments, and incidents with a clean UI and local storage persistence.

---

## ✨ Features

### 🔐 Authentication

- Email/password-based login.
- Session persistence via `localStorage`.
- Two roles: `Admin` and `Patient`.

### 🧑‍⚕️ Admin Panel

- View, add, edit, delete **Patients**.
- Track and manage **Incidents (treatments)** per patient.
- See scheduled appointments in a **calendar view**.
- Responsive UI with **Dark mode**, **Sidebar collapse**, and **Burger menu**.

### 👨‍⚕️ Patient Panel

- View personal profile and health history.
- Review past **treatment incidents**.
- Book new appointments via a simple **form modal**.
- Instant confirmation feedback and clean UX.

### 🧪 Tech Stack

- React + TypeScript
- Tailwind CSS (with custom theme)
- React Router
- React Calendar
- Yup (for validation)
- LocalStorage for mock persistence
- Framer Motion + Toast Notifications (for animations/feedback)

---

## 🧪 Dummy Accounts

To explore the app, use these built-in demo users:

### 👤 Admin

- **Email:** `admin@entnt.in`
- **Password:** `admin123`

### 🧑 Patient

- **Email:** `john@entnt.in`
- **Password:** `patient123`

Accounts are seeded on first load via `mockSeeder.ts`.

---

## 🛠️ Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/PhazeAnkit/Dental_Center.git
cd Dental_Center

# 2. Install dependencies
npm install

# 3. Run the app
npm run dev
```

App runs at: `http://localhost:5173`

To build for production:

```bash
npm run build
```

---
