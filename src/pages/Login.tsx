// src/pages/Login.tsx
import LoginForm from "../components/LoginForm";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import dentistImage from "../assets/Login_Image.webp"; // Use the image you uploaded

const Login = () => {
  const { toggleTheme, darkMode } = useContext(ThemeContext);

  return (
    <div className="min-h-screen flex">
      {/* Left Image Side */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${dentistImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/70 to-transparent dark:from-black/40" />
        <div className="z-10 m-auto text-center p-8 text-gray-800 dark:text-white">
          <h2 className="text-3xl font-bold mb-4">Welcome to Dental Care</h2>
          <p className="text-lg font-light">Your smile is our passion 😁</p>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 relative">
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 text-xs px-4 py-2 border rounded-md"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Login to Your Account
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
