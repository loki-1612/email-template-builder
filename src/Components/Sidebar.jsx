import React from "react";
import App from "../App";

export default function Sidebar({ onAdd }) {
  return (
    <div className="h-90 bg-slate-900 rounded-xl shadow-lg text-white p-4 space-y-4">
      <h2 className="text-lg font-semibold tracking-wide mb-4">Blocks</h2>

      <button
        onClick={() => onAdd("text")}
        className="w-full bg-slate-700 hover:bg-slate-600 rounded-md py-2"
      >
        ➕ Text
      </button>

      <button
        onClick={() => onAdd("image")}
        className="w-full bg-slate-700 hover:bg-slate-600 rounded-md py-2"
      >
        🖼 Image
      </button>

      <button
        onClick={() => onAdd("button")}
        className="w-full bg-slate-700 hover:bg-slate-600 rounded-md py-2"
      >
        🔘 Button
      </button>
    </div>
  );
}