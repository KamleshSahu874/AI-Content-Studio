"use client";

import { useEffect, useState } from "react";

interface Post {
  id: number;
  title?: string;
  content: string;
  platform: string;
  createdAt?: string;
}

export default function HistoryPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editPlatform, setEditPlatform] = useState("BLOG");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("jwt");
        window.location.href = "/login";
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to load content history.");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (post: Post) => {
    setEditingPost(post);
    setEditTitle(post.title || "");
    setEditContent(post.content);
    setEditPlatform(post.platform);
    setMessage("");
  };

  const cancelEditing = () => {
    setEditingPost(null);
    setEditTitle("");
    setEditContent("");
    setEditPlatform("BLOG");
  };

  const saveEdit = async () => {
    if (!editingPost) return;

    const token = localStorage.getItem("jwt");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (!editContent.trim()) {
      setMessage("Content cannot be empty.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/${editingPost.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editTitle,
            content: editContent,
            platform: editPlatform,
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          text || "Failed to update content."
        );
      }

      const updatedPost = await response.json();

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === editingPost.id
            ? updatedPost
            : post
        )
      );

      setMessage("Content updated successfully!");
      cancelEditing();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (id: number) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this content?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete content.");
      }

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== id)
      );

      setMessage("Content deleted successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  };

  const copyContent = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setMessage("Content copied to clipboard.");
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-bold">
              AI Content Studio
            </h1>

            <p className="text-sm text-slate-400">
              Content History
            </p>
          </div>

          <div className="flex gap-3">

            <a
              href="/"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm transition hover:bg-slate-800"
            >
              Dashboard
            </a>

            <button
              onClick={logout}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm transition hover:bg-slate-800"
            >
              Logout
            </button>

          </div>

        </div>
      </header>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Content History
          </h2>

          <p className="mt-2 text-slate-400">
            View, edit, copy and delete your generated content.
          </p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="mb-6 rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300">
            {message}
          </div>
        )}

        {/* EDITOR */}
        {editingPost && (
          <div className="mb-8 rounded-2xl border border-blue-500/30 bg-slate-900 p-6">

            <div className="mb-6 flex items-center justify-between">

              <h3 className="text-xl font-semibold">
                Edit Content
              </h3>

              <button
                onClick={cancelEditing}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
              >
                Cancel
              </button>

            </div>

            <div className="space-y-5">

              {/* TITLE */}
              <div>

                <label className="mb-2 block text-sm text-slate-300">
                  Title
                </label>

                <input
                  value={editTitle}
                  onChange={(e) =>
                    setEditTitle(e.target.value)
                  }
                  placeholder="Content title"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                />

              </div>

              {/* PLATFORM */}
              <div>

                <label className="mb-2 block text-sm text-slate-300">
                  Platform
                </label>

                <select
                  value={editPlatform}
                  onChange={(e) =>
                    setEditPlatform(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                >
                  <option value="BLOG">
                    Blog
                  </option>

                  <option value="LINKEDIN">
                    LinkedIn
                  </option>

                  <option value="INSTAGRAM">
                    Instagram
                  </option>

                  <option value="TWITTER">
                    Twitter / X
                  </option>
                </select>

              </div>

              {/* CONTENT */}
              <div>

                <label className="mb-2 block text-sm text-slate-300">
                  Content
                </label>

                <textarea
                  value={editContent}
                  onChange={(e) =>
                    setEditContent(e.target.value)
                  }
                  rows={18}
                  className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                />

              </div>

              {/* SAVE */}
              <button
                onClick={saveEdit}
                disabled={saving}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
            <p className="text-slate-400">
              Loading your content...
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && posts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">

            <div className="mb-4 text-5xl">
              📝
            </div>

            <h3 className="text-xl font-semibold">
              No content yet
            </h3>

            <p className="mt-2 text-slate-400">
              Generate your first AI article from the dashboard.
            </p>

            <a
              href="/"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
            >
              Create Content
            </a>

          </div>
        )}

        {/* POSTS */}
        {!loading && posts.length > 0 && (
          <div className="space-y-6">

            {posts.map((post) => (

              <article
                key={post.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >

                {/* POST HEADER */}
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                  <div>

                    <h3 className="text-xl font-semibold">
                      {post.title || "Generated Content"}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-2">

                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                        {post.platform}
                      </span>

                      {post.createdAt && (
                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                          {new Date(
                            post.createdAt
                          ).toLocaleString()}
                        </span>
                      )}

                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap gap-2">

                    <button
                      onClick={() =>
                        startEditing(post)
                      }
                      className="rounded-lg border border-blue-500/30 px-4 py-2 text-sm text-blue-400 transition hover:bg-blue-500/10"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        copyContent(post.content)
                      }
                      className="rounded-lg border border-slate-700 px-4 py-2 text-sm transition hover:bg-slate-800"
                    >
                      Copy
                    </button>

                    <button
                      onClick={() =>
                        deletePost(post.id)
                      }
                      className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      Delete
                    </button>

                  </div>

                </div>

                {/* CONTENT */}
                <div className="max-h-[500px] overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-800 bg-slate-950 p-5 leading-7 text-slate-300">
                  {post.content}
                </div>

              </article>

            ))}

          </div>
        )}

      </section>

    </main>
  );
}