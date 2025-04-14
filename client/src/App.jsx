import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [dbmessage, setDbmessage] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/hello`)
      .then((res) => setMessage(res.data.message))
      .catch((err) => {
        console.error("Axios Error:", err);
        setMessage("Failed to fetch message");
      });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/database`)
      .then((res) => setDbmessage(res.data.dbmessage))
      .catch((err) => {
        console.error("Axios Error:", err);
        setMessage("Failed to fetch database message");
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
