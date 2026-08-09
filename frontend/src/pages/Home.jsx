import React, { useState } from "react";
import { auth, googleProvider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import api from "../utils/axios";
import { FcGoogle } from "react-icons/fc";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Home = () => {

  const [loading, setLoading] = useState(false);
  const { userData } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogin = async (token) => {
    
    try {
      const { data } = await api.post("/api/auth/login", { token });
      dispatch(setUserData(data.user));

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
    <div className = "h-screen bg-black flex text-white overflow-hidden">
      {!userData && (<div className = "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className = "w-[340px] bg-[#13131c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5 ">
            <div classsName = "flex flex-col gap-1">
                <h2 clasName = "text-[17px] font-semibold text-slate-100 tracking-tight">Welcome to IntelliChat</h2>
                <p className = " text-[13px] text-slate-500">Please login to continue using the app</p>
            </div>
            <button className = "w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-black/90 bg-white hover:bg-gray-200  transition-all duration-150 cursor-pointer" onClick = {googleLogin} disabled={loading}>
                <FcGoogle size={15} />
                Continue with Google
            </button>
        </div>
      </div>)}
      
    </div>
  )
}

export default Home
