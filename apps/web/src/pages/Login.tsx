import { Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GlassCard from "../components/ui/GlassCard";
import api from "../api/client";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError("");
    setLoading(true);

    api.post("/auth/login", { username, password })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        navigate("/dashboard");
      })
      .catch(err => {
        setError(
          err.response?.data?.error || "خطا در ورود"
        );
        setLoading(false);
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <motion.div
        initial={{opacity:0,y:30}}
        animate={{opacity:1,y:0}}
        className="w-full max-w-md"
      >
        <GlassCard>
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
              🤖
            </div>
            <h1 className="text-3xl font-bold text-white">
              EasyBoy
            </h1>
            <p className="mt-2 text-white/50">
              Admin Control Panel
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
              <User size={20} className="text-white/50"/>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-white outline-none"
                placeholder="Username"
              />
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
              <Lock size={20} className="text-white/50"/>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-white outline-none"
                placeholder="Password"
              />
            </div>

            {error && (
              <p className="text-center text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-blue-500
              to-purple-600
              py-3
              font-bold
              text-white
              hover:scale-105
              transition
              disabled:opacity-50
              "
            >
              {loading ? "در حال ورود..." : "Sign In"}
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </main>
  );
}