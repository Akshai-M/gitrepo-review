"use client"

import { CircleDotDashed } from "lucide-react";
import { useState } from "react";

export function AddRepo({ onRepoAdded }: { onRepoAdded: () => void }) {
  const [gitUrl, setGitUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    if (!gitUrl.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/add-repo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ git_url: gitUrl.trim() }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setGitUrl("");
        if (onRepoAdded) onRepoAdded(); // Ensure this triggers the correct update
      } else {
        console.error("Failed to add repository.", data);
        alert(data?.error || "Failed to add repository.");
      }
    } catch (error) {
      console.error("API call error:", error);
    } finally {
      setLoading(false);
    }
  }

  const isButtonDisabled = loading || !gitUrl.trim();

  return (
    <div className="p-4 bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-xl backdrop-blur-sm">
      <div className="relative">
        <input
          className="w-full px-4 py-3.5 rounded-xl bg-slate-900/80 text-white placeholder-slate-500 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 focus:outline-none transition-all duration-200 text-sm"
          placeholder="https://github.com/username/repo"
          value={gitUrl}
          onChange={(e) => setGitUrl(e.target.value)}
          disabled={loading}
        />
      </div>
      <button
        className={`w-full mt-3 flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-all duration-200 text-sm ${
          isButtonDisabled
            ? "bg-slate-700 text-slate-400 cursor-not-allowed"
            : "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
        }`}
        onClick={handleAdd}
        disabled={isButtonDisabled}
      >
        {loading ? (
          <CircleDotDashed className="animate-spin" />
        ) : (
          <>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Repository
          </>
        )}
      </button>
    </div>
  );
}
