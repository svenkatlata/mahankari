import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, login, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) return null;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const message = await login({ email, password });
    if (message) {
      console.error("Login failed:", message);
      return;
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={onSubmitHandler}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
          >
            Login
          </button>

          {/* Forgot Password */}
          <p className="text-center text-sm text-gray-500 mt-4 hover:underline cursor-pointer">
            Forgot password?
          </p>
        </form>
      </div>
    </div>
  );
}
