import React from "react";

export default function ExportHtmlModal({ html, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Export Email HTML
        </h2>

        <textarea
          readOnly
          value={html}
          className="w-full h-64 border border-slate-300 rounded-lg p-3 text-sm font-mono text-slate-700"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => {
              navigator.clipboard.writeText(html);
              alert("HTML copied!");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Copy HTML
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}