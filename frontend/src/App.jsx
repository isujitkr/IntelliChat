import React, { useState } from "react";
import { auth, googleProvider } from "./utils/firebase";
import { signInWithPopup } from "firebase/auth";
import api from "./utils/axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/auth/login", { token });

      toast.success("Login successful!");

    } catch (error) {
      toast.error( 
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please try again."
      )
    }
  };

  const googleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);

      const token = await result.user.getIdToken();

      await handleLogin(token);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please try again."
      )
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <button
        className="w-50 h-24 bg-white"
        onClick = {googleLogin}
        disabled={loading}
      >
        {loading ? "Signing in..." : "Continue with Google"}
      </button>
      
       <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
      />
      
    </div>

    
  );
};

export default App;
