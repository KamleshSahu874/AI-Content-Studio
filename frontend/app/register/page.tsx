"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.text();

      if (!response.ok) {
        setMessage(data || "Registration failed");
        return;
      }

      setMessage("Registration successful!");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-gray-900 p-8 shadow-2xl">

        <h1 className="text-3xl font-bold text-white mb-2">
          Create Account
        </h1>

        <p className="text-gray-400 mb-6">
          Create your AI Content Studio account
        </p>

        <form onSubmit={handleRegister} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Message */}
          {message && (
            <div className="rounded-lg bg-gray-800 p-3 text-sm text-gray-200">
              {message}
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Login
          </button>
        </p>

      </div>
    </main>
  );
}