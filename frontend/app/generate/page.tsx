"use client";

import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function GeneratePage() {
  const [platform, setPlatform] = useState("BLOG");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      window.location.href = "/login";
      return;
    }
  }, []);

  // =========================
  // GENERATE AI CONTENT
  // =========================

  const generateContent = async () => {
    if (!topic.trim()) {
      setMessage("Please enter a topic.");
      return;
    }

    const token = localStorage.getItem("jwt");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    setLoading(true);
    setMessage("");
    setContent("");

    try {
      const response = await fetch(`${API_URL}/api/ai/generate`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          platform,
          topic,
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        setMessage(text || "Failed to generate content.");
        return;
      }

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      if (data?.content) {
        setContent(data.content);
      } else if (typeof data === "string") {
        setContent(data);
      } else {
        setContent(text);
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to connect to the backend. Make sure Spring Boot is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SAVE CONTENT
  // =========================

  const saveContent = async () => {
    // Prevent duplicate requests
    if (saving) {
      return;
    }

    if (!content.trim()) {
      setMessage("Generate content first.");
      return;
    }

    const token = localStorage.getItem("jwt");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/posts`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title: topic,
          content: content,
          platform: platform,
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        setMessage(text || "Failed to save content.");
        return;
      }

      setMessage("Content saved successfully! ✅");
    } catch (error) {
      console.error(error);

      setMessage("Unable to save content.");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userName");

    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <a
            href="/"
            className="text-2xl font-bold"
          >
            AI Content
            <span className="text-blue-500">
              Studio
            </span>
          </a>

          <div className="flex gap-3">

            <a
              href="/"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
            >
              Dashboard
            </a>

            <a
              href="/history"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
            >
              History
            </a>

            <button
              onClick={logout}
              className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* MAIN */}
      <section className="mx-auto max-w-5xl px-6 py-12">

        {/* HEADER */}
        <div className="mb-10">

          <p className="text-sm uppercase tracking-widest text-blue-400">
            AI Content Generator
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Create AI-Powered Content
          </h1>

          <p className="mt-3 text-slate-400">
            Enter a topic and let AI create content for you.
          </p>

        </div>

        {/* GENERATOR FORM */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          {/* PLATFORM */}
          <label className="block text-sm font-medium text-slate-300">
            Platform
          </label>

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
          >
            <option value="BLOG">
              Blog
            </option>

            <option value="SOCIAL_MEDIA">
              Social Media
            </option>

            <option value="LINKEDIN">
              LinkedIn
            </option>

            <option value="INSTAGRAM">
              Instagram
            </option>
          </select>

          {/* TOPIC */}
          <label className="mt-6 block text-sm font-medium text-slate-300">
            Topic
          </label>

          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Example: Benefits of Artificial Intelligence"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />

          {/* GENERATE BUTTON */}
          <button
            onClick={generateContent}
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Generating with AI..."
              : "✨ Generate Content"}
          </button>

        </div>

        {/* MESSAGE */}
        {message && (
          <div className="mt-5 rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">
            {message}
          </div>
        )}

        {/* GENERATED CONTENT */}
        {content && (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between gap-4">

              <h2 className="text-2xl font-bold">
                Generated Content
              </h2>

              {/* SAVE BUTTON */}
              <button
                onClick={saveContent}
                disabled={saving}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "💾 Save"}
              </button>

            </div>

            <div className="mt-6 whitespace-pre-wrap rounded-xl border border-slate-800 bg-slate-950 p-6 leading-7 text-slate-300">
              {content}
            </div>

          </div>
        )}

      </section>

    </main>
  );
}