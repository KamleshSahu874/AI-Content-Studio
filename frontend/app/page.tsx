"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const name = localStorage.getItem("userName");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (name) {
      setUserName(name);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userName");

    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <nav className="border-b border-slate-800 bg-slate-950/90">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <a href="/" className="group">
            <h1 className="text-2xl font-bold tracking-tight">
              AI Content
              <span className="text-blue-500">
                Studio
              </span>
            </h1>

            <p className="text-xs text-slate-500">
              AI-powered content creation
            </p>
          </a>

          <div className="flex items-center gap-3">

            <a
              href="/"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-500"
            >
              Dashboard
            </a>

            <a
              href="/generate"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium transition hover:bg-slate-800"
            >
              Generate
            </a>

            <a
              href="/history"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium transition hover:bg-slate-800"
            >
              History
            </a>

            <button
              onClick={logout}
              className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="max-w-3xl">

          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-blue-400">
            Welcome back
          </p>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Hello, {userName}! 👋
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Create high-quality AI-powered content for blogs,
            social media and other platforms in seconds.
          </p>

        </div>

      </section>

      {/* DASHBOARD CARDS */}
      <section className="mx-auto max-w-7xl px-6 pb-16">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* GENERATE */}
          <a
            href="/generate"
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-7 transition hover:-translate-y-1 hover:border-blue-500/50"
          >

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
              ✨
            </div>

            <h3 className="text-xl font-semibold">
              Generate Content
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Generate AI-powered articles and content
              based on your topic and selected platform.
            </p>

            <div className="mt-6 text-sm font-medium text-blue-400">
              Start generating →
            </div>

          </a>

          {/* HISTORY */}
          <a
            href="/history"
            className="group rounded-2xl border border-slate-800 bg-slate-900 p-7 transition hover:-translate-y-1 hover:border-purple-500/50"
          >

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
              📚
            </div>

            <h3 className="text-xl font-semibold">
              Content History
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              View, edit, copy and delete your previously
              generated content.
            </p>

            <div className="mt-6 text-sm font-medium text-purple-400">
              View history →
            </div>

          </a>

          {/* AI */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl">
              🤖
            </div>

            <h3 className="text-xl font-semibold">
              AI Powered
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Powered by your Spring Boot backend and
              OpenAI integration for intelligent content
              generation.
            </p>

            <div className="mt-6 text-sm font-medium text-emerald-400">
              AI Connected ✓
            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="border-t border-slate-800">

        <div className="mx-auto max-w-7xl px-6 py-16">

          <h2 className="text-2xl font-bold">
            What you can do
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-2xl">✍️</p>

              <h3 className="mt-4 font-semibold">
                Generate
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Create AI-generated content from simple
                prompts.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-2xl">💾</p>

              <h3 className="mt-4 font-semibold">
                Save
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Store generated content safely in your
                database.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-2xl">✏️</p>

              <h3 className="mt-4 font-semibold">
                Edit
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Modify your generated content whenever
                needed.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-2xl">📋</p>

              <h3 className="mt-4 font-semibold">
                Copy
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Copy finished content directly to your
                clipboard.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800">

        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-slate-500">

          AI Content Studio
          <span className="mx-2">•</span>
          Built with Next.js + Spring Boot + MySQL + OpenAI

        </div>

      </footer>

    </main>
  );
}