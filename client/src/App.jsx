// src/App.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Login from "./assets/components/Login";

function App() {
  // const [message, setMessage] = useState("");
  // const [dbmessage, setDbmessage] = useState("sadf");

  // useEffect(() => {
  //   // Fetching general server message
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL}/api/hello`)
  //     .then((res) => setMessage(res.data.message))
  //     .catch((err) => {
  //       console.error("Hello API Error:", err);
  //       setMessage("Failed to fetch message");
  //     });

  //   // Fetching message from MongoDB
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL}/api/database`)
  //     .then((res) => setDbmessage(res.data.database))
  //     .catch((err) => {
  //       console.error("Database API Error:", err);
  //       setDbmessage("Failed to fetch database message");
  //     });
  // }, []);

  const [onLogin, setOnlogin] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen bg-black text-center px-4">
        {!onLogin ? (
          <>
            <h1 className="text-5xl md:text-7xl font-bold text-amber-100 drop-shadow-lg mb-4">
              DoodleDo
            </h1>
            <p className="text-amber-100 text-xl md:text-2xl mb-6">
              Todo List Management System
            </p>
            <button
              className="bg-white text-gray-800 font-semibold px-6 py-2 rounded-md shadow hover:bg-gray-200 transition duration-300"
              onClick={() => setOnlogin(true)}
            >
              Get Started
            </button>
          </>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
}

export default App;
