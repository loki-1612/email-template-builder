import React from "react";

export default function Sidebar({ onAdd }) {
  return (
    <div className="w-64 bg-slate-900 text-white p-4 space-y-4">
      <h2 className="text-lg font-semibold">Blocks</h2>

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