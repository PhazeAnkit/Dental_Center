import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { seedMockData } from "./utils/mockSeeder";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
seedMockData();

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      theme="colored"
    />
  </React.StrictMode>
);
