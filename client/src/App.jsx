// src/App.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [dbmessage, setDbmessage] = useState("sadf");

  useEffect(() => {
    // Fetching general server message
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/hello`)
      .then((res) => setMessage(res.data.message))
      .catch((err) => {
        console.error("Hello API Error:", err);
        setMessage("Failed to fetch message");
      });

    // Fetching message from MongoDB
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/database`)
      .then((res) => setDbmessage(res.data.database))
      .catch((err) => {
        console.error("Database API Error:", err);
        setDbmessage("Failed to fetch database message");
      });
  }, []);

  return (
    <>
      <h1>{message}</h1>
      <p>HELLO Ron</p>
      <h4>{dbmessage}</h4>
    </>
  );
}

export default App;
