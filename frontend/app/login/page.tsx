"use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      // Read response as text first
      const responseText = await response.text();

      let data: any;

      // Try to parse JSON if backend returned JSON
      try {
        data = JSON.parse(responseText);
      } catch {
        data = null;
      }

      if (!response.ok) {
        const errorMessage =
          typeof data === "string"
            ? data
            : data?.message ||
              data?.error ||
              responseText ||
              "Invalid email or password";

        throw new Error(errorMessage);
      }

      // Get JWT from backend response
      const token =
        data?.token ||
        data?.jwt ||
        data?.accessToken;

      if (!token) {
        throw new Error(
          "Login successful, but JWT token was not returned by the backend."
        );
      }

      // Save JWT
      localStorage.setItem("jwt", token);

      setMessage("Login successful!");

      // Go to dashboard
      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">

      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold">
            AI Content Studio
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Login to your account
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="kamlesh3@example.com"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

          {/* MESSAGE */}

          {message && (
            <div className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-slate-300">
              {message}
            </div>
          )}

        </form>

      </div>

    </main>
  );
}