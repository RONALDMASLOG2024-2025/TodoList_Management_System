import React, { useState } from "react";
import { auth, provider, signInWithPopup } from "../firebase";
import axios from "axios";
import Todo from "./Todo";

function Login() {
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      provider.setCustomParameters({
        prompt: "select_account",
      });
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, {
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
      });

      console.log("HELLO");
      console.log("User:", result.user);
    } catch (error) {
      console.error("Google Sign-In Error", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center relative">
      {!user ? (
        <>
          <h1 className="text-5xl md:text-7xl font-bold text-amber-100 drop-shadow-lg mb-4">
            DoodleDo
          </h1>
          <p className="text-amber-100 text-xl md:text-2xl mb-8">
            To-do List Web Application System
          </p>
          <button
            onClick={handleGoogleLogin}
            className="bg-white text-gray-800 font-semibold px-6 py-2 rounded-md shadow hover:bg-gray-200 transition duration-300 mb-4"
            type="button"
          >
            Continue with Google
          </button>

          <div className="absolute bottom-4 text-center text-sm opacity-50">
            <p className="text-gray-100">Made by Ronald Maslog</p>
            <p className="text-gray-100">Year 2025</p>
          </div>
        </>
      ) : (
        <>
          {/* <p className="text-amber-100">Welcome, {user.displayName}!</p> */}

          <Todo user={user}></Todo>
        </>
      )}
    </div>
  );
}

export default Login;
