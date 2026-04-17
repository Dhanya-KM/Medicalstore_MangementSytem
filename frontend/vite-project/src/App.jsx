import { useState } from "react";
import Layout from "./components/Layout";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLogin = async () => {
    setEmailError("");
    setPassError("");

    if (!email) return setEmailError("Email required");
    if (!validateEmail(email)) return setEmailError("Invalid email");
    if (!password) return setPassError("Password required");

    try {
      setLoading(true);
      // Replace with your backend login
      const fakeToken = "123456";
      localStorage.setItem("token", fakeToken);
      setToken(fakeToken);
      setEmail("");
      setPassword("");
    } catch {
      setPassError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  if (token) return <Layout token={token} onLogout={handleLogout} />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Medical Store Login
        </h2>

        <input
          type="text"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="text-red-600 text-sm">{emailError}</p>}

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passError && <p className="text-red-600 text-sm">{passError}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded mt-2"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
