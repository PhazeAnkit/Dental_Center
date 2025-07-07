// src/components/LoginForm.tsx
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      const role = email === "admin@entnt.in" ? "Admin" : "Patient";
      navigate(role === "Admin" ? "/admin" : "/patient");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-darkBg rounded-2xl shadow-xl p-8 space-y-5 border dark:border-gray-700"
    >
      {error && (
        <div className="text-red-600 text-sm text-center bg-red-100 dark:bg-red-900 p-2 rounded-md">
          {error}
        </div>
      )}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="flex flex-col relative">
        <label htmlFor="password" className="text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          type={showPass ? "text" : "password"}
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPass((prev) => !prev)}
          className="absolute right-3 top-9 text-xs text-gray-500 dark:text-gray-300"
        >
          {showPass ? "Hide" : "Show"}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-cyan-600 text-white font-semibold py-2 rounded-md shadow-md"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
