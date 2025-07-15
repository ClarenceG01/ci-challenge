import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { errorToast, successToast } from "../utils/toast";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        errorToast("Login failed. Please check your credentials.", "login-e");
        return;
      }
      const { user, message } = await response.json();
      setUser(user);
      successToast(message || "Login Successful", "login-s");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Login error:", error);
      errorToast("Login failed. Please try again.", "login-e");
    }
  };

  return (
    <div className=" w-full flex flex-col items-center justify-center min-h-screen font-inter">
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="block mx-auto p-6 rounded shadow-md w-80 dark:bg-gray-800"
      >
        <h2 className="text-xl font-semibold font-abz text-center">Taskyz Login</h2>
        <div className="mb-4 mt-2">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", { required: true })}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
