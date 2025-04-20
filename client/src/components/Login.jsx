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
          <img
              src="/transparentLogo.png"
              alt="User Logo"
              className="h-80 w-auto rounded-sm object-cover"
            />
           
            <p className="text-amber-100/70 text-xl md:text-xl mb-6">
              To-do List Management System
            </p>
          <button
            onClick={handleGoogleLogin}
            className="bg-white/90 text-gray-800 font-semibold px-6 py-2 rounded-md shadow hover:bg-gray-200 transition duration-300 mb-4"
            type="button"
          >
            Continue with Google
          </button>

          <div className="absolute bottom-4 text-center text-sm opacity-50">
            <p className="text-gray-100">Made by Maslog & Aung</p>
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
